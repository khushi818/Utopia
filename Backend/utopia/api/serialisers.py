from rest_framework import serializers
from .models import Room


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'


class MyRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('user', 'name', 'created_at')


class createRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('name',)
