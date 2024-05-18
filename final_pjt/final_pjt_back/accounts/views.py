from django.shortcuts import render
from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests
from django.http import JsonResponse
from django.conf import settings
from .serializers import UserSerializers
from django.contrib.auth import get_user_model

# Create your views here.
@api_view(["GET", "POST"])
def save_user(request) :
    User = get_user_model()
    users = User.objects.all()
    if request.method == "POST" :
        serializer = UserSerializers(data=request.data)
        if serializer.is_valid() :
            user = User.objects.create_user(username=serializer.data['username'],
                                            nickname=serializer.data['nickname'],
                                            email=serializer.data['email'],
                                            age=serializer.data['age'],
                                            money=serializer.data['money'],
                                            salary=serializer.data['salary'],
                                            password=serializer.data['password'])
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "GET" :
        serializer = UserSerializers(users, many=True)
        return Response(serializer.data)
    
class UserViewSet(viewsets.ModelViewSet):
    User = get_user_model()
    queryset = User.objects.all()
    serializer_class  = UserSerializers

@api_view(["GET"])
def current_user(request):
    User = get_user_model()
    user = request.user
    if user.is_authenticated:
        serializer = UserSerializers(user)
        return Response(serializer.data)
    return Response(status=status.HTTP_401_UNAUTHORIZED)