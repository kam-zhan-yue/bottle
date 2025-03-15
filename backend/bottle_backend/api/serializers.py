from accounts.models import Bottle, Message
from rest_framework import serializers

class InboxSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bottle
        fields = ['id']

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id','text','sender','created_at']