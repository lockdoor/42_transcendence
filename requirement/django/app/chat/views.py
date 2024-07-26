# from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from .models import *

# Create your views here.

# return room_name as json
# {chatroom: <room_name>}
def get_or_create_chatroom(request, username):
  if request.user.username == username:
    return JsonResponse({'error': 'User can not self friend'}, status=401)
  
  User = get_user_model()
  other_user = User.objects.get(username=username)
  my_chatrooms = request.user.chat_groups.filter(is_private=True)

  if my_chatrooms.exists():
    for chatroom in my_chatrooms:
        if other_user in chatroom.members.all():
            chatroom = chatroom
            break
        else:
            chatroom = ChatGroup.objects.create(is_private=True)
            chatroom.members.add(other_user, request.user)
  else:
      chatroom = ChatGroup.objects.create(is_private=True)
      chatroom.members.add(other_user, request.user)

  return JsonResponse({'chatroom': chatroom.group_name}, status=200)