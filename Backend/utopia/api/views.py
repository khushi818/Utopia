from django.shortcuts import render
from rest_framework import generics,status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serialisers import RoomSerializer,createRoomSerializer
from .models import Room
# Create your views here.
class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwargs = 'code'

    def get(self,request,format = None):
        code = request.GET.get(self.lookup_url_kwargs)
        if code != None:
            room = Room.objects.filter(code = code)
            if len(room) > 0:
                data = RoomSerializer(room[0]).data
                data['is_host'] = self.request.session.session_key == room[0].host
                return Response(data,status = status.HTTP_200_OK)
            return Response({'Room not found' : 'Invalid Room code'}, status =  status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request' : 'Code parameter not found in request'}, status =  status.HTTP_400_BAD_REQUEST)
      
class CreateRoomView(APIView):
    serializer_class = createRoomSerializer
    def post(self,request,format = None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            name = serializer.data.get('name')
            host = self.request.session.session_key
            queryset = Room.objects.filter(name = name) 
            if queryset.exists():
                room = queryset[0]
                room.name = name
                room.save(update_fields=['name'])
            else: 
                room = Room(host = host ,name= name)
                room.save()

        return Response(RoomSerializer(room).data , status = status.HTTP_201_CREATED)                
    
