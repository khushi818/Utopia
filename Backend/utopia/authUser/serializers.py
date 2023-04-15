from rest_framework import serializers
from .models import User, UserProfile
from rest_framework.fields import CurrentUserDefault


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    class Meta:
        fields = '__all__'


class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    username = serializers.CharField()
    password = serializers.CharField()

    class Meta:
        fields = '__all__'

    def create(self, validated_data):
        return User.objects.create(**validated_data)


class RefreshSerializer(serializers.Serializer):
    refresh = serializers.CharField()


class UserSeriliazer(serializers.ModelSerializer):
    class Meta:
        model = User
        field = '__all__'
        exclude = ('password',)


class UserProfileSerializer(serializers.ModelSerializer):
    image_url = serializers.ImageField(required=False)

    class Meta:
        model = UserProfile
        fields = '__all__'
