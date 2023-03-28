from django.urls import path
from .views import create_agora_session

urlpatterns = [
    path('agora/', create_agora_session.as_view()),
]
