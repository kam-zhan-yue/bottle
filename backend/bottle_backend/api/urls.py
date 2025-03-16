from django.urls import include, path

from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path("bottles-for-user/<int:user_id>/", views.received_bottles, name='bottles_for_user'),
    path("reply-bottle/", views.reply_bottle, name='reply_bottle'),
    path("forward-bottle/", views.forward_bottle, name='create_bottle'),
    path("get-bottle-creator/", views.get_bottle_creator, name='get_bottle_creator'),
]
