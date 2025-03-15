from django.contrib import admin

# Register your models here.
from .models import Bottle, Message

admin.site.register(Bottle)
admin.site.register(Message)