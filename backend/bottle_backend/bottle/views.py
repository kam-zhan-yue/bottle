from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    return HttpResponse("Hello World");

# def get_all_bottles(request):
#     # bottle_list = Bottle.objects.all()
#     # print(bottle_list)
#     return {}

# def get_bottle(request, bottle_id):
#     # bottle = Bottle.objects.all()
#     return 

# def get_message(request, message_id):
#     return

# def get_messages(request, bottle_id):
#     return

# def get_user(request, user_id):
#     return