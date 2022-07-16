from django.http import JsonResponse
from datetime import datetime

from .models import DistanceQuery

from .distance import find_distance
from .serializers import AddressSerializer, DistanceQuerySerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class DistanceApiView(APIView):
    def post(self, request):
        addressFromSerializer = AddressSerializer(data=request.data['addressFrom'])
        addressToSerializer = AddressSerializer(data=request.data['addressTo'])
        addressFromValid = addressFromSerializer.is_valid() 
        addressToValid = addressToSerializer.is_valid() 
        if not addressFromValid or not addressToValid:
            return JsonResponse({'addressFrom': addressFromSerializer.errors, 'addressTo': addressToSerializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
        a1 = addressFromSerializer.save()
        a2 = addressToSerializer.save()
        distance = find_distance(address1=addressFromSerializer.data, address2=addressToSerializer.data)
        
        if distance: 
            # TODO save tuple addresses
            time = datetime.now()
            dq = DistanceQuery.objects.create(address_from=a1, address_to=a2, distance=distance, time=time)
            dqSerialized = DistanceQuerySerializer(dq)
            return JsonResponse(dqSerialized.data, status=status.HTTP_200_OK)
        return JsonResponse({'error': distance}, status=status.HTTP_400_BAD_REQUEST)