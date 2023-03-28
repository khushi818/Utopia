from django.contrib import admin
from .models import User,UserProfile
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
# Register your models here.
class UserModelAdmin(BaseUserAdmin):   
#     # The fields to be used in displaying the User model.
#     # These override the definitions on the base UserModelAdmin
#     # that reference specific fields on auth.User.
    list_display = ('id','username', 'email','is_superuser')
    list_filter = ('is_superuser',)
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('email',)}),
        ('Permissions', {'fields': ('is_superuser',)}),
    )
#     # add_fieldsets is not a standard ModelAdmin attribute. UserModelAdmin
#     # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password', 'email'),
        }),
    )
    search_fields = ('username',)
    ordering = ('username','id')
    filter_horizontal = ()


# Now register the new UserAdmin...
admin.site.register(User,UserModelAdmin)
admin.site.register(UserProfile)