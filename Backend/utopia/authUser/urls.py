from django.urls import path, include


from .views import UserRegisterView, UserProfileView, UserLoginView, UserView

urlpatterns = [
    path('register/', UserRegisterView.as_view(), name="register"),
    path('login/', UserLoginView.as_view(), name="login"),
    path('personal/', UserView.as_view(), name="user"),
    path('profile/', UserProfileView.as_view(), name="Profile"),
    path('profile/<int:pk>', UserProfileView.as_view(), name="edit")
    # path('me/' , MeView.as_view() , name = 'me')
]
