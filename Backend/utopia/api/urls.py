from django.urls import path
from .views import RoomView, CreateRoomView, GetRoom, JoinRoom, leaveRoom, UserRooms, searchView

urlpatterns = [
    path('room/', RoomView.as_view()),
    path('find/', searchView.as_view()),
    path('createroom/', CreateRoomView.as_view()),
    path('get-room/', GetRoom.as_view()),
    path('join-room/', JoinRoom.as_view()),
    path('leave-room/', leaveRoom.as_view()),
    path('myrooms/', UserRooms.as_view()),
]
