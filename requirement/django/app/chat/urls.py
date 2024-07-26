from django.urls import path
from .views import *

urlpatterns = [
    # path('', chat_view, name="home"),
    # expect friend name for find chatroom_name
    path('<username>', get_or_create_chatroom, name="start-chat"),
    # path('chat/room/<chatroom_name>', chat_view, name="chatroom"),
]