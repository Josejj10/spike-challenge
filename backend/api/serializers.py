from enum import unique
from rest_framework import serializers
from .models import Address, AddressGeometry, AddressProperties, DistanceQuery

# Create your model serializers here.

class AddressGeometrySerializer(serializers.ModelSerializer):
    class Meta:
        model = AddressGeometry
        fields="__all__"
class AddressPropertiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddressProperties
        fields="__all__"

class AddressSerializer(serializers.ModelSerializer):
    properties = AddressPropertiesSerializer()
    geometry = AddressGeometrySerializer()
    class Meta:
        model = Address
        fields = ['bbox','geometry','properties']
        
    def create(self, validated_data):
        properties_data = validated_data.pop('properties')
        geometry_data = validated_data.pop('geometry')
        id_data = properties_data['osm_id']
        addressExists = Address.objects.filter(id=id_data).exists()
        if(addressExists):
            address = Address.objects.filter(id=id_data).first()
            return address
        geo = AddressGeometry.objects.create(**geometry_data)
        prop = AddressProperties.objects.create(**properties_data)
        address = Address.objects.create(id=id_data, geometry=geo, properties=prop, **validated_data)
        return address

class DistanceQuerySerializer(serializers.ModelSerializer):
    addressFrom = AddressSerializer(source='address_from')
    addressTo = AddressSerializer(source='address_to')
    class Meta:
        model = DistanceQuery
        fields = ['addressFrom', 'addressTo', 'distance','time','id']
        