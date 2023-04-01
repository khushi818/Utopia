from django.db import models
from authUser.models import User
from api.models import Room
# Create your models here.


class chatRoom(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=50, default="anonymous")
    channel_name = models.CharField(max_length=20, default="")
    message = models.TextField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username
