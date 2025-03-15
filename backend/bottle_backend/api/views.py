from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status
from django.http import HttpResponse

from accounts.models import Bottle, Message
from .serializers import InboxSerializer, MessageSerializer
# Create your views here.

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