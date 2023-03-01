from rest_framework.response import Response
from rest_framework import status 
from rest_framework.views import APIView
from .serializers import UserRegisterSerializer,UserLoginSerializer,UserProfileSerializer
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
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
        serializer = UserRegisterSerializer(data =  request.data)
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
        serializer = UserLoginSerializer(data = request.data)
        if(serializer.is_valid(raise_exception=True)):
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            user = authenticate(email = email, password = password)
            if(user is not None):
               token = get_tokens_for_user(user)
               return Response({'token':token,'msg' : 'Login Successful'},status = status.HTTP_200_OK)
            else :
                return Response({'errors' : {'non_field_errors':['Email or Password is not Valid']}},
                               status= status.HTTP_404_NOT_FOUND )


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request,format = None):
         serializer = UserProfileSerializer(request.user)
         return Response(serializer.data,status=status.HTTP_200_OK)