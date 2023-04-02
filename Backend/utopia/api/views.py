from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from .serialisers import RoomSerializer, createRoomSerializer, MyRoomSerializer
from .models import Room
from rest_framework.permissions import IsAuthenticated

# Create your views here.


class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwargs = 'code'

    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwargs)
        if code != None:
            room = Room.objects.filter(code=code)
            if len(room) > 0:
                data = RoomSerializer(room[0]).data
                data['is_host'] = self.request.session.session_key == room[0].host
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room not found': 'Invalid Room code'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Code parameter not found in request'}, status=status.HTTP_400_BAD_REQUEST)


class UserRooms(APIView):
    lookup_url_kwargs = 'username'
    permission_classes = [IsAuthenticated]
    renderer_classes = [JSONRenderer]

    def get(self, request, format=None):
        user = self.request.user
        rooms = Room.objects.filter(user=user)
        # username = self.request.user.username
        # request.data['username'] = self.request.user.username
        serialiser = MyRoomSerializer(rooms, many=True)
        return Response(serialiser.data)


class JoinRoom(APIView):
    lookup_url_kwargs = 'code'
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        code = request.data.get(self.lookup_url_kwargs)
        if code != None or code != "":
            roomResult = Room.objects.filter(code=code)
            if len(roomResult) > 0:
                room = roomResult[0]
                self.request.session['room_code'] = code
                return Response({'message': 'Room Joined'}, status=status.HTTP_200_OK)
            return Response({'bad request': 'Invalid Room code'}, status=status.HTTP_400_BAD_REQUEST)
        return Response('bad request : Invalid post data, did not find the code key', status=status.HTTP_400_BAD_REQUEST)


class CreateRoomView(APIView):
    serializer_class = createRoomSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            name = serializer.data.get('name')
            host = self.request.session.session_key
            user = request.user
            queryset = Room.objects.filter(name=name)
            if queryset.exists():
                room = queryset[0]
                room.name = name
                room.save(update_fields=['name'])
                self.request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)
            else:
                room = Room(user=user, host=host, name=name)
                self.request.session['room_code'] = room.code
                room.save()
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)

        return Response({'bad request'}, status=status.HTTP_400_BAD_REQUEST)


class leaveRoom(APIView):

    def post(self, request, format=None):
        if 'room_code' in self.request.session:
            self.request.session.pop('room_code')
            host_id = self.request.session.session_key
            room_results = Room.objects.filter(host=host_id)
            if len(room_results) > 0:
                room = room_results[0]
                room.delete()
            return Response({'message': 'success'}, status=status.HTTP_200_OK)
