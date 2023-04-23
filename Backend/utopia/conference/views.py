from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import APIView
from agora_token_builder import RtcTokenBuilder
from .serializers import AgoraSerializer
from rest_framework.permissions import IsAuthenticated
import random
import time
import os

# class AgoraSessionViewSet(viewsets.ModelViewSet):
#     queryset = AgoraSession.objects.all()
#     serializer_class = AgoraSessionSerializer


class create_agora_session(APIView):
    serializer_class = AgoraSerializer

    def get(self, request):
        lookup_url_kwargs = 'channel'
        app_Id = os.getenv('APP_ID')
        app_certificate = os.getenv('APP_CERTIFICATE')
        Channel_name = request.GET.get(lookup_url_kwargs)
        uid = random.randint(1, 500)
        expirationTimeInSeconds = 3600 * 24
        currentTimeStamp = time.time()
        privelgeExpiredTs = currentTimeStamp + expirationTimeInSeconds
        role = 1

        token = RtcTokenBuilder.buildTokenWithUid(
            app_Id, app_certificate, Channel_name, uid, role, privelgeExpiredTs)

        results = AgoraSerializer({'token': token, 'uid': uid}).data
        return Response(results)
