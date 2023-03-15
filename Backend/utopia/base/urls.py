from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import RoomViews

urlpatterns = [
    path('room/', RoomViews.as_view({'get': 'list', 'post': 'create'})),
    path('room/<int:pk>/',RoomViews.as_view({'get':'retrieve','put' :'update','delete':'destroy'}), name = "room")
]
