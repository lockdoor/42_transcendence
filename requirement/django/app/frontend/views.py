from django.shortcuts import render, redirect
from django.conf import settings

# Create your views here.
def index(request):
    if request.user.is_authenticated:
        return redirect('frontend:dashboard')
    return render(request, "index.html")

def dashboard(request):
    if not request.user.is_authenticated:
        return redirect('frontend:index')
    context = {
        "id": request.user.id,
        "username": request.user.username,
        "avatar": f'{settings.MEDIA_URL}{request.user.avatar}'
    }
    if (settings.ALLOW_API_WITHOUT_JWT == False):
        context['access_token'] = request.session['access_token']
        context['refresh_token'] = request.session['refresh_token']

    return render(request, "dashboard.html", {"user": context})