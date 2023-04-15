from rest_framework.response import Response
from rest_framework import status, generics, mixins
from rest_framework.views import APIView
from .serializers import RefreshSerializer, LoginSerializer, UserProfileSerializer, RegisterSerializer, UserSeriliazer
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .models import UserProfile, User
from django.shortcuts import get_object_or_404
# from django.contrib.auth.models import User
from django.db.utils import IntegrityError
from rest_framework.parsers import JSONParser
# generating tokens


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return ({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    })

# class UserRefreshView(APIView):
#     def post(self,request):
#         user = User.objects.filter(request.data)
#         if(user):


class UserRegisterView(APIView):
    def post(self, request, format=None):
        serializer = RegisterSerializer(data=request.data)
        if(serializer.is_valid(raise_exception=True)):
            password = serializer.validated_data.get('password')
            serializer.validated_data['password'] = make_password(password)
            user = serializer.save()
            if user:
                token = get_tokens_for_user(user)
                return Response({'token': token, 'msg': 'registration is working'}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    def post(self, request, format=None):
        serializer = LoginSerializer(data=request.data)
        if(serializer.is_valid(raise_exception=True)):
            username = serializer.data.get('username')
            password = serializer.data.get('password')
            user = authenticate(username=username, password=password)
            if(user is not None):
                token = get_tokens_for_user(user)
                return Response({'token': token, 'msg': 'Login Successful'}, status=status.HTTP_200_OK)
            else:
                return Response({'errors': {'non_field_errors': ['Email or Password is not Valid']}},
                                status=status.HTTP_404_NOT_FOUND)


class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        serializer = UserSeriliazer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileSerializer
# #     lookup_field = 'username'
    # queryset = UserProfile.objects.all()

    def get(self, request, username, format=None):
        profile = UserProfile.objects.get(username=username)
        serialiser = UserProfileSerializer(profile)
        return Response(serialiser.data, status=status.HTTP_200_OK)

    # def post(self, request, format=None):
    #     profile = UserProfile.objects.create(username=request.user)
    #     serialiser = UserProfileSerializer(
    #         profile)
    #     if(serialiser.is_valid()):
    #         serialiser.save()
    #         return Response(serialiser.data, status=status.HTTP_201_CREATED)
    #     return Response(serialiser.data, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, format=None):
        profile = UserProfile.objects.get(username=request.user)
        serialiser = UserProfileSerializer(
            profile, data=request.data, partial=True)
        if(serialiser.is_valid()):
            serialiser.save()
            return Response(serialiser.data, status=status.HTTP_200_OK)
        return Response(serialiser.data, status=status.HTTP_400_BAD_REQUEST)


# class UserProfileView(generics.ListAPIView):
#     permission_classes = [IsAuthenticated]
#     serializer_class = UserProfileSerializer
#     queryset = UserProfile.objects.all()
