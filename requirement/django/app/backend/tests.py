import json
from django.test import Client
from django.test import TestCase
from django.conf import settings
from django.contrib.auth import authenticate, login, logout, get_user_model

# Create your tests here.
class LoginTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.login_url ='/api/auth/login'
        
    def test_login_success(self):
        """
            If login success should return 200
        """
        User = get_user_model()
        user = User.objects.create_user(username="user1234", password="password1234")
        payload = {
            "username": "user1234",
            "password": "password1234"
        }
        
        response = self.client.post(
            self.login_url, 
            json.dumps(payload),
            content_type='application/json')
        is_online_user = User.objects.get(username="user1234")
 
        self.assertEqual(response.status_code, 200)
        self.assertEqual(is_online_user.is_online , True)
        
    def test_login_with_invalid_username(self):
        """
            If login with invalid username should return 401
        """
        User = get_user_model()
        user = User.objects.create_user(username="user1234", password="password1234")
        payload = {
            "username": "user12345",
            "password": "password1234"
        }
        
        response = self.client.post(
            self.login_url, 
            json.dumps(payload),
            content_type='application/json')

        self.assertEqual(response.status_code, 401)
    
    def test_login_with_method_not_allowed(self):
        """
            If login with invalid username should return 405
        """
        response = self.client.get(self.login_url,)

        self.assertEqual(response.status_code, 405)