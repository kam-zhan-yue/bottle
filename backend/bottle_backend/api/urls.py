from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path("bottles-for-user/<int:user_id>", views.received_bottles, name='bottles_for_user'),
]