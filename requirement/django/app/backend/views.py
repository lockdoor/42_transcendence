import json
from django.shortcuts import render
from django.middleware.csrf import get_token
from django.contrib.sessions.models import Session
from django.http import JsonResponse, HttpResponseNotAllowed
from django.contrib.auth import authenticate, login, logout, get_user_model

DEFAULT_AVATAR = 'uploads/default.png'

def index(request):
    return render(request, 'backend/login.html')

def user_register(request):
    return render(request, 'backend/register.html')

#1.1 /api/auth/login
def UserLogin(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        if request.user.is_authenticated:
            return JsonResponse({'error': 'User is already logged in'}, status=400)
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            user.is_online = True
            user.save()
        else:
            return JsonResponse({'error': 'Invalid username or password'}, status=401)    
        return JsonResponse({'message': 'Login success'}, status=200)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    
#1.2 /api/auth/register
def UserRegister(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        avatar = request.FILES.get('avatar')
        
        if not username or not password:
            return JsonResponse({'error': 'Both username and password are required'}, status=400)
       
        User = get_user_model()
        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already exists'}, status=400)

        user = User.objects.create_user(username=username, password=password)
        if avatar:
            user.avatar = avatar
        user.save()
        
        return JsonResponse({'message': 'Create user success'}, status=201)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

#1.3 /api/auth/logout
def UserLogout(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
            User = get_user_model()
            user = User.objects.get(id=request.user.id)
            user.is_online = False
            user.save()
            logout(request)
            return JsonResponse({'message': 'Logout success'}, status=200)
        else:
            return JsonResponse({'error': 'User is not logged in'}, status=401)
    return JsonResponse({'error': 'Method not allowed'}, status=405)

def get_csrf_token_and_session_id(request):
    csrf_token = get_token(request)
    session_id = request.session.session_key
    return JsonResponse({'csrf_token': csrf_token, 'sessionid': session_id}, status=200)