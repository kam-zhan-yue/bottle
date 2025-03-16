import json
import random

from accounts.models import Bottle, Message
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .serializers import InboxSerializer, MessageSerializer

# Create your views here.

def get_random_user(bottle):
    users = User.objects.exclude(id=bottle.creator.id).values_list('id', flat=True) 
    if users.exists():
        return random.choice(users)
    else:
        return bottle.creator

def index(request):
    return HttpResponse("Hello World")

@api_view(['GET'])
@permission_classes([AllowAny])
def received_bottles(request, user_id):
    bottled_query = Bottle.objects.filter(receiver=user_id)
    serializer = InboxSerializer(bottled_query, many=True)
    
    output = []
    for bottle in serializer.data:
        bottle_out = {
            "bottle_id": bottle["id"],
            "messages": []
        }
        message_query = Message.objects.filter(bottle=bottle["id"])
        message_serializer = MessageSerializer(message_query, many=True)
        bottle_out["messages"].append(message_serializer.data)
        output.append(bottle_out)
    return Response(output)

@api_view(['POST'])
def reply_bottle(request):
    # user_id = request.body["user_id"] # might not be needed
    data = json.loads(request.body)
    bottle_id = data["bottle_id"]
    message = data["message"]
    user = request.user
    return_body = dict()
    
    bottle = Bottle.objects.get(id=bottle_id)
    Message.objects.create(text=message, sender=user, bottle=bottle)

    return_body["bottle_id"] = bottle.id
    return_body["receiver_id"] = bottle.creator.id

    try:
        Message.objects.create(text=message, sender=user, bottle=bottle)
    except:
        return Response({"message": "error creating message object"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    return Response({"message": return_body}, status=status.HTTP_200_OK)

@api_view(['POST'])
def forward_bottle(request):
    try:
        # user_id = request.body["user_id"] # might not be needed
        data = json.loads(request.body)
        bottle_id = data["bottle_id"]
        user = request.user
        return_body = dict()
        
        bottle = Bottle.objects.get(id=bottle_id)

        return_body["bottle_id"] = bottle.id
        return_body["receiver_id"] = get_random_user(bottle)
        return Response({"message": return_body}, status=status.HTTP_200_OK)

    except:
        return Response({"message": "error in forwarding the bottle"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
    