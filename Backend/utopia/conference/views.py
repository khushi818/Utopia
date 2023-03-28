from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import APIView
from agora_token_builder import RtcTokenBuilder
from .serializers import AgoraSerializer
import random,time

# class AgoraSessionViewSet(viewsets.ModelViewSet):
#     queryset = AgoraSession.objects.all()
#     serializer_class = AgoraSessionSerializer

class create_agora_session(APIView):
    
    serializer_class = AgoraSerializer
    def get(self,request):
        lookup_url_kwargs = 'channel' 

        app_Id = "50aa357a11604d798b12088f413a4efa"
        app_certificate = "4e265a154f73461b93da9c7a93da3f10"
        Channel_name = request.GET.get(lookup_url_kwargs)
        uid = random.randint(1,500)
        expirationTimeInSeconds = 3600 * 24
        currentTimeStamp = time.time()
        privelgeExpiredTs = currentTimeStamp + expirationTimeInSeconds
        role = 1

        token = RtcTokenBuilder.buildTokenWithUid(app_Id, app_certificate, Channel_name, uid, role,privelgeExpiredTs)

        results = AgoraSerializer({'token' : token ,'uid' :uid}).data
        return Response(results)
