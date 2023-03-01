from rest_framework import serializers
from .models import User

class UserRegisterSerializer(serializers.ModelSerializer):
    # password2 = serializers.CharField(style = {'input_type':'password'},write_only = True)
    class Meta:
        model = User
        fields = ['email','name','password','tc']
        extra_kwargs ={
            'password':{'write_only':True}
        }

        # # validate password and confirm password while registration
        # def Validate(self, attrs):
        #     password = attrs.get('password')
        #     password2 = attrs.get('password2')
        #     if(password != password2):
        #         raise serializers.ValidationError("wrong confirm password")
        #     return attrs
        
        def create(self, validate_data):
            return User.objects.create_user(**validate_data)

class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length = 255)
    class Meta:
        model = User
        fields = ['email','password']         

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','name','email']
