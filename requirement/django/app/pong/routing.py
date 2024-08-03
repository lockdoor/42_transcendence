from django.urls import path
from .consumers import *

websocket_urlpatterns = [
    path("ponggame/<player1>/<player2>", PongConsumer.as_asgi())
]