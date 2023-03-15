from django.urls import path
from . import views

urlpatterns = [
    path('join/',views.lobby),
    path('space/',views.space)
]
