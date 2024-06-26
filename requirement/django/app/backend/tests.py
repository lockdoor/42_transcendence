import json
from django.test import Client
from django.test import TestCase
from django.conf import settings
from django.core.files.uploadedfile import SimpleUploadedFile
from django.contrib.auth import authenticate, login, logout, get_user_model

# Create your tests here.
class LoginTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.login_url ='/api/auth/login'
        self.payload = {
            "username": "user1234",
            "password": "password1234"
        }
        
    def test_login_success(self):
        """
            If login success should return 200
        """
        User = get_user_model()
        user = User.objects.create_user(username="user1234", password="password1234")
        
        response = self.client.post(
            self.login_url, 
            json.dumps(self.payload),
            content_type='application/json')
        updated_user = User.objects.get(username="user1234")
 
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['message'], 'Login success')
        self.assertEqual(updated_user.is_online , True)
        
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
        self.assertEqual(response.json()['error'], 'Invalid username or password')
    
    def test_duplicate_login(self):
        """
            If user login 2 times with the same session 
        """
        User = get_user_model()
        user = User.objects.create_user(username="user1234", password="password1234")
        for i in range(2):        
            response = self.client.post(
            self.login_url, 
            json.dumps(self.payload),
            content_type='application/json')

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['error'], 'User is already logged in')

    def test_login_with_method_not_allowed(self):
        """
            If login with invalid username should return 405
        """
        response = self.client.get(self.login_url,)
        self.assertEqual(response.status_code, 405)
        self.assertEqual(response.json()['error'], 'Method not allowed')


class RegiterTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.register_url ='/api/auth/register'
        self.payload = {
            "username": "user1234",
            "password": "password1234"
        }
        self.file_upload = {
            'name': 'test_avatar.jpg',
            'content': b'test image content',
            'content_type': 'image/jpeg'
        }
   
    def test_register_success(self):
        """
            Expect response body as a multipart/form-data
            If user registeration success should return status 201
        """
        avatar = SimpleUploadedFile(
            name=self.file_upload['name'],
            content=self.file_upload['content'],
            content_type=self.file_upload['content_type']
        )
        response = self.client.post(
            self.register_url,
            data={
                'username': self.payload['username'],
                'password': self.payload['password'],
                'avatar': avatar
            }
        )
        User = get_user_model()
        user = User.objects.get(username=self.payload['username'])
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()['message'], 'Create user success')
        self.assertEqual(user.avatar, f'avatars/{self.file_upload['name']}')
  
    def test_register_success_without_avatar(self):
        """
            Expect response body is multipart/form-data
            If user registered success should return status 201
        """
        response = self.client.post(
            self.register_url,
            data={
                'username': self.payload['username'],
                'password': self.payload['password'],
            }
        )
        User = get_user_model()
        user = User.objects.get(username=self.payload['username'])
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()['message'], 'Create user success')
        self.assertEqual(user.avatar, f'avatars/default.png')

    def test_register_with_method_not_allowed(self):
        """
            If login with invalid username should return 405
        """
        response = self.client.get(self.register_url,)
        self.assertEqual(response.status_code, 405)
        self.assertEqual(response.json()['error'], 'Method not allowed')

class LogoutTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.client2 = Client()
        self.logout_url ='/api/auth/logout'
        self.login_url = '/api/auth/login'
        
        User = get_user_model()
        self.user = User.objects.create_user(username="user1234", password="password1234")
        self.payload = {
            "username": "user1234",
            "password": "password1234"
        }
        self.client.post(
            self.login_url, 
            json.dumps(self.payload),
            content_type='application/json')

    def test_logout_success(self):
        """
            If logout success should return 200
        """
        response = self.client.post(self.logout_url, content_type='application/json')
        User = get_user_model()
        updated_user = User.objects.get(username="user1234")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['message'], 'Logout success')
        self.assertEqual(updated_user.is_online, False)

    def test_logout_failed(self):
        """
            If logout before login should return 401
        """
        response = self.client2.post(self.logout_url, content_type='application/json')
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.json()['error'], 'User is not logged in')

    def test_logout_with_method_not_allowed(self):
        """
            If logout with method other than POST should return 405
        """
        response = self.client.get(self.logout_url)
        self.assertEqual(response.status_code, 405)
        self.assertEqual(response.json()['error'], 'Method not allowed')
