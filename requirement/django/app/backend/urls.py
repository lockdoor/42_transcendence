from django.urls import path
from . import views

urlpatterns = [
    path("auth/login", views.UserLogin, name="userLogin"),
    path("auth/logout", views.UserLogout, name="userLogout"),
    
]