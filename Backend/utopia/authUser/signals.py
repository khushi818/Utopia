from django.db.models.signals import post_save
from django.db.models import signals
from django.dispatch import receiver
from .models import UserProfile, User


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        print("created")
        UserProfile.objects.create(username=instance)


@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    instance.userprofile.save()


signals.post_save.connect(receiver=create_profile, sender=User)
signals.post_save.connect(receiver=save_profile, sender=User)
