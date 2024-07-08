from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    # Define the fields to be displayed in the admin interface
    list_display = ('username', 'email', 'is_staff', 'is_active', 'date_joined')
    # Define the fields to be used in the form for adding or changing users
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('email', 'avatar', 'score', 'friend')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
        ('Important dates', {'fields': ('last_login',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2', 'email', 'avatar', 'score', 'friend', 'is_active', 'is_staff', 'is_superuser')}
        ),
    )
    # Define the fields to be used in the form for viewing a user's details
    readonly_fields = ('date_joined', 'last_login')

# Register the CustomUser model with the custom admin class
admin.site.register(CustomUser, CustomUserAdmin)