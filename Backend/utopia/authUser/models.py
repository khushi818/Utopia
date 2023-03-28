from django.db import models
from django.utils import timezone
# Create your models here.
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser,PermissionsMixin
)

class MyUserManager(BaseUserManager):
    def create_user(self,username ,password=None , **extra_fields):
        """
        Creates and saves a User with the given email, name and password.
        """
        if not username:
            raise ValueError('Users must have an username')

        user = self.model(username = username, **extra_fields)

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self,username ,password=None , **extra_fields):
    #     """
    #     Creates and saves a superuser with the given username,email, and password
    #     """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")

        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(username, password, **extra_fields)

# custom user model

class User(AbstractBaseUser,PermissionsMixin):
    username = models.CharField(unique=True, max_length=100)
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_online = models.DateTimeField(default=timezone.now)
     
    objects = MyUserManager()

    USERNAME_FIELD = 'username'

    def __str__(self):
        return self.username

    class Meta:
        ordering = ("created_at",)

class UserProfile(models.Model):
    user = models.OneToOneField(User, related_name= "user_profile",on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100,null = True)
    last_name = models.CharField(max_length=100 , null = True)
    caption = models.CharField(max_length=250, null = True)
    about = models.TextField(blank = True,default ="")
    # profile_picture = models.ForeignKey(
        # GenericFileUpload, related_name="user_image", on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username

    class Meta:
        ordering = ("created_at",)    
