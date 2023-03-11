from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from .serializers import RoomSerializer
from .models import Room
from rest_framework import viewsets
from django.shortcuts import get_object_or_404

# Create your views here.
# class RoomViews(generics.ListAPIView):
    # queryset = Room.objects.all()
    # serializer_class = RoomSerializer

class RoomViews(viewsets.ViewSet):
    def list(self,request):
        rooms = Room.objects.all()
        serializers = RoomSerializer(rooms,many = True)
        return Response(serializers.data)

    def create(self,request):
        serializers = RoomSerializer(data =  request.data)
        if(serializers.is_valid()):
            serializers.save()
            return Response(serializers.data,status = status.HTTP_201_CREATED)
        return Response(serializers.errors,status = status.HTTP_400_BAD_REQUEST)

    def retrieve(self,request,pk = None):
        queryset = Room.objects.all()
        room = get_object_or_404(queryset,pk = pk)
        serializers = RoomSerializer(room)
        return Response(serializers.data) 

    def update(self,request,pk = None):
        room = Room.objects.get(pk=pk)

        serializers = RoomSerializer(room,data =  request.data)
        if(serializers.is_valid()):
            serializers.save()
            return Response(serializers.data,status = status.HTTP_201_CREATED)
        return Response(serializers.errors,status = status.HTTP_400_BAD_REQUEST)

    def destroy(self,request,pk=None):
        room = Room.objects.get(pk = pk)
        room.delete()
        return Response(status =  status.HTTP_204_NO_CONTENT)
              
