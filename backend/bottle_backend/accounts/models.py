import uuid

from django.db import models

# Create your models here.

class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username=models.CharField(max_length=50)
    created_at=models.DateTimeField(auto_now_add=True)

class Bottle(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    text=models.TextField()
    sender=models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

class Message(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    text = models.TextField()
    sender = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    bottle = models.ForeignKey(Bottle, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    