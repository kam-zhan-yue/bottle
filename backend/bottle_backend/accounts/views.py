from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status, viewsets
from .models import User, Bottle, Message
from .serializers import UserSerializer, MessageSerializer, BottleSerializer
from .forms import RegisterForm
from django.contrib.auth import login
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

class BottleViewSet(viewsets.ModelViewSet):
    queryset = Bottle.objects.all()
    serializer_class = BottleSerializer

@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')

    # Validate input
    if not username or not password:
        return Response({"error": "Username and Password are required."}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already taken"}, status=400)

    user = User.objects.create_user(username=username, password=password)
    user.save()
    return Response({
    "message": "User registered successfully",
    "user_id": user.id
    }, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": UserSerializer(user).data
        })
    return Response({"error": "Invalid credentials"}, status=400)

@api_view(['GET'])
def profile(request):
    return Response(UserSerializer(request.user).data)
