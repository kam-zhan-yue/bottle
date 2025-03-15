from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status
from django.http import HttpResponse

from accounts.models import Bottle, User
from .serializers import InboxSerializer
# Create your views here.

def index(request):
    return HttpResponse("Hello World")

@api_view(['GET'])
@permission_classes([AllowAny])
def received_bottles(request, user_id):
    bottled_query = Bottle.objects.filter(receiver=user_id)
    serializer = InboxSerializer(bottled_query, many=True)

    return Response(serializer.data)
    bottle_list = [
        {"id": 1, "name": "Bottle 1", "description": "This is a sample bottle."},
        {"id": 2, "name": "Bottle 2", "description": "Another sample bottle."},
        {"id": 3, "name": "Bottle 3", "description": "Yet another sample bottle."}
    ]

    return Response({"bottles": bottle_list}, status=status.HTTP_200_OK)
    # try:
    #     user = User.objects.get(id=user_id)

    #     # Retrieve the user
    #     # Get all bottles related to this user (assuming you have a ForeignKey relationship)
    #     bottles = Bottle.objects.filter(creator=user)

    #     # Serialize the bottles data (assuming you have a Bottle serializer)
    #     bottle_list = [{"id": bottle.id, "name": bottle.name, "description": bottle.description} for bottle in bottles]
    #     return json.dumps({"bottles": bottle_list}, status=200)

    # except User.DoesNotExist:
    #     return json.dumps({"error": "User not found"}, status=404)