from django.urls import path
from . import views

urlpatterns = [
    path('room/', views.RoomViews.as_view())
]
