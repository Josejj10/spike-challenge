# https://www.geeksforgeeks.org/program-distance-two-points-earth/
from .models import Address
from math import radians, cos, sin, asin, sqrt


def find_distance(address1, address2):
    lat1, lon1 = address1.get('geometry', None).get('coordinates',None)
    lat2, lon2 = address2.get('geometry', None).get('coordinates',None)

    # The math module contains a function named
    # radians which converts from degrees to radians.
    lon1 = radians(lon1)
    lon2 = radians(lon2)
    lat1 = radians(lat1)
    lat2 = radians(lat2)
      
    # Haversine formula
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
 
    c = 2 * asin(sqrt(a))
    
    # Radius of earth in kilometers. Use 3956 for miles
    r = 6371
      
    # calculate the result
    return(c * r)