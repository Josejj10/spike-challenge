from unicodedata import category
from django.contrib.postgres.fields import ArrayField
from django.db import models

# Create your models here.
class AddressProperties(models.Model):
    auto_increment_id = models.AutoField(primary_key=True)
    place_id=models.BigIntegerField()
    osm_type=models.CharField(max_length=20) 
    osm_id=models.CharField(max_length=20)
    display_name=models.CharField(max_length=400)
    place_rank=models.IntegerField()
    category=models.CharField(max_length=20)
    type=models.CharField(max_length=20)
    importance=models.FloatField()

class AddressGeometry(models.Model):
    auto_increment_id = models.AutoField(primary_key=True)
    type= models.CharField(max_length=20)
    coordinates= ArrayField(models.FloatField(), size=2)

class Address(models.Model):
    id = models.CharField(primary_key=True, max_length=20)
    properties = models.OneToOneField(AddressProperties, on_delete=models.CASCADE, null=True, blank=True)
    bbox = ArrayField(models.FloatField(), size=4)
    geometry = models.OneToOneField(AddressGeometry, on_delete=models.CASCADE,null=True, blank=True)

class DistanceQuery(models.Model):
    id = models.AutoField(primary_key=True)
    distance = models.FloatField()
    time = models.DateTimeField()
    address_from = models.ForeignKey(Address, on_delete=models.CASCADE, related_name='+')
    address_to = models.ForeignKey(Address, on_delete=models.CASCADE, related_name='+')