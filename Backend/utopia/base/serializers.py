from rest_framework import serializers
from . import models

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Room
        # participants = models.Room.participants.all()
        fields = ('id','host','topic','name','description','created','updated')
        
class Topic(serializers.ModelSerializer):
    class Meta:
        model = models.Topic
        fields = ('name')

class Message(serializers.ModelSerializer):
    class Meta:
        model = models.Message
        fields = ('user','room','body','updated','created')