
from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include('base.urls')),
    path('',include('video_call.urls')),
    path('api/user/',include('accounts.urls'))
]
