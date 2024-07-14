from django.shortcuts import render, redirect

# Create your views here.
def index(request):
    if request.user.is_authenticated:
        return redirect('frontend:dashboard')
    return render(request, "index.html")

def dashboard(request):
    if not request.user.is_authenticated:
        return redirect('frontend:index')
    
    return render(request, "dashboard.html", {"user": request.user})