from rest_framework.response import Response
from rest_framework import status,generics,mixins 
from rest_framework.views import APIView
from .serializers import LoginSerializer,RegisterSerializer,UserProfileSerializer,UserSeriliazer
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .models import UserProfile
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.db.utils import IntegrityError
#generating tokens

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


# Create your views here.

class UserRegisterView(APIView):
    def post(self, request,format= None):
        serializer = RegisterSerializer(data =  request.data)
        if(serializer.is_valid(raise_exception=True)):
            password = serializer.validated_data.get('password')
            serializer.validated_data['password'] = make_password(password)
            user = serializer.save()
            if user:
                token = get_tokens_for_user(user)
                return Response({'token': token ,'msg' : 'registration is working'},status = status.HTTP_201_CREATED)

        return Response(serializer.errors,status = status.HTTP_400_BAD_REQUEST)
     
class UserLoginView(APIView):
    def post(self,request,format = None):
        serializer = LoginSerializer(data = request.data)
        if(serializer.is_valid(raise_exception=True)):
            username = serializer.data.get('username')
            password = serializer.data.get('password')
            user = authenticate(username = username, password = password)
            if(user is not None):
               token = get_tokens_for_user(user)
               return Response({'token':token,'msg' : 'Login Successful'},status = status.HTTP_200_OK)
            else :
                return Response({'errors' : {'non_field_errors':['Email or Password is not Valid']}},
                               status= status.HTTP_404_NOT_FOUND )


class UserView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request,format = None):
         serializer = UserSeriliazer(request.user)
         return Response(serializer.data,status=status.HTTP_200_OK)
    
# class UserProfileView(APIView):
#     permission_classes = [IsAuthenticated]
#     serializer_class = UserProfileSerializer

class UserProfileView(generics.GenericAPIView, mixins.RetrieveModelMixin, mixins.UpdateModelMixin):
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileSerializer
    lookup_field = 'username'
    queryset = UserProfile.objects.all()
    
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
    # def get(self,request,username):
    #     #  profile = UserProfile.objects.get(id = id)
    #     #  serializer = UserProfileSerializer(profile)
    #     #  return Response(serializer.data,status=status.HTTP_200_OK)
    #      # Retrieve the User object for the given username
    #     user = get_object_or_404(UserProfile, username= request.user.username)

    #     # Retrieve the associated UserProfile object
    #     try:
    #         user_profile = user.user_profile
    #     except user_profile.DoesNotExist:
    #         return Response({'message' :'not found'})
    #     serializer = UserProfileSerializer(user_profile)
    #     return Response(serializer.data,status=status.HTTP_200_OK)


    # def patch(self , request, id):
    #     profile = UserProfile.objects.get(id = id)
    #     serializer = UserProfileSerializer(profile, data=request.data, partial=True)
    #     if serializer.is_valid():
    #         profile = serializer.save()
    #         return Response(serializer.data,status=status.HTTP_200_OK)    
        
    # def delete(self, request, id):
    #     profile = UserProfile.objects.get(id = id)
    #     profile.delete()     
    #     return Response(status=status.HTTP_204_NO_CONTENT)
