from rest_framework import serializers

class AgoraSerializer(serializers.Serializer):
    token = serializers.CharField()
    uid = serializers.IntegerField()