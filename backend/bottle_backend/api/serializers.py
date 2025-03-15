from accounts.models import Bottle
from rest_framework import serializers

class InboxSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bottle
        fields = '__all__'
