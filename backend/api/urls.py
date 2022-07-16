from django.urls import path

from .views import DistanceApiView

urlpatterns = [
    path('distance', DistanceApiView.as_view(), name='distance_api_view'),
]
