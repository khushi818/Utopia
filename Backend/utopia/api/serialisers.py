from rest_framework import serializers
from .models import Room
# from django.contrib.auth import get_user, get_user_model
# from rest_framework.serializers import Serializer


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'


class MyRoomSerializer(serializers.ModelSerializer):

    created_at = serializers.DateTimeField(format="%d-%m-%Y %H:%M %p")

    class Meta:
        model = Room
        fields = ('user', 'name', 'code', 'created_at')


class createRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('name',)
