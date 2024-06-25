import json
from django.shortcuts import render
from django.http import JsonResponse, HttpResponseNotAllowed
from django.contrib.auth import authenticate, login, logout, get_user_model

#1.1 /api/auth/login
def UserLogin(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        
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
            return JsonResponse({'message': 'User is not logged in'}, status=401)
    return JsonResponse({'error': 'Method not allowed'}, status=405)