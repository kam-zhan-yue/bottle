from django.contrib import admin

# Register your models here.
from .models import Bottle, User, Message

admin.site.register(Bottle)
admin.site.register(User)
admin.site.register(Message)