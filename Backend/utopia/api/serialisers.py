from rest_framework import serializers
from .models import Room

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id','code','name','host','name','created_at',)

class createRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('name',)                 