import uuid

from django.contrib.auth.models import User
from django.db import models

# Create your models here.

class Bottle(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    creator=models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="creator")
    receiver=models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="receiver")
    last_sent=models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="last_sent")
    counter=models.IntegerField(default=0)

class Message(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    text = models.TextField()
    sender = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    bottle = models.ForeignKey(Bottle, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

class OnlineUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
