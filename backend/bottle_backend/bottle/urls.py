from django.urls import path, include
from django.http import HttpResponse
from . import views

urlpatterns = [
    # Create a websocket test URL
    path('websocket-test/', views.websocket_test, name='websocket_test'),
    # Root path for the app
    path('', lambda request: HttpResponse("Welcome to the Bottle app! <a href='websocket-test/'>WebSocket Test</a>"))
]