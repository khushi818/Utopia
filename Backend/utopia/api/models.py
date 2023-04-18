from django.db import models
import string
import random
from authUser.models import User


def generate_unique_code():
    length = 6
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if(Room.objects.filter(code=code).count() == 0):
            break

    return code
# Create your models here.


class Room(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE)
    code = models.CharField(
        max_length=8, default=generate_unique_code, unique=True)
    host = models.CharField(max_length=50, default=None)
    name = models.CharField(max_length=50, default=None)
    created_at = models.DateTimeField(auto_now_add=True)
    search_fields = models.CharField(max_length=50, default="")

    def __str__(self):
        return self.name
