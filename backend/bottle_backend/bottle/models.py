from django.db import models

# Create your models here.
class Bottle(models.Model):
    id=models.IntegerField(primary_key=True)
    text=models.TextField()
    sender=models.IntegerField()