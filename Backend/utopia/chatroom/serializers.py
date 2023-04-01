from rest_framework import serializers
from .models import chatRoom
from django.contrib.auth import get_user_model


class ChatRoomSerializer(serializers.ModelSerializer):
    username = get_user_model().get_username

    class Meta:
        model = chatRoom
        fields = ('username', 'channel_name', 'message', 'created_at', )
