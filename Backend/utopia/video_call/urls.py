from django.urls import path
from . import views

urlpatterns = [
    path('utopia/topic',views.lobby),
    path('space/',views.space)
]
