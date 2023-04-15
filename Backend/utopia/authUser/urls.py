from django.urls import path, include


from .views import UserRegisterView, UserProfileView, UserLoginView, UserView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('register/', UserRegisterView.as_view(), name="register"),
    path('login/', UserLoginView.as_view(), name="login"),
    path('personal/', UserView.as_view(), name="user"),
    path('profile/<str:username>/', UserProfileView.as_view(), name="Profile"),
    path('profile/', UserProfileView.as_view(), name="Profile")
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
