from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("", views.index, name="index"),
    path("user_register", views.user_register),
    path("auth/login", views.UserLogin, name="userLogin"),
    path("auth/login42", views.UserLogin42, name="userLogin42"),
    path("auth/callback", views.callback, name="callback"),
    path("auth/register", views.UserRegister, name="userRegister"),
    path("auth/logout", views.UserLogout, name="userLogout"),
    path("users/<int:user_id>/<int:owner_id>/profile", views.UserProfile, name="userProfile"),
    path("users/update_avatar", views.UpdateUserAvatar, name="updateUserAvatar"),
    path("users/notifications/friend_request", views.SendFriendRequest, name="sendFriendRequest"),
    path("users/<int:user_id>/notifications", views.GetNotifications, name="getNotifications"),
    path("users/friends/accept", views.AcceptFriend, name="acceptFriend"),
    path("users/<int:user_id>/friends", views.GetAllFriends, name="getAllFriend"),
    path("users/<int:user_id>/friends/find_new", views.FindNewFriends, name="findNewFriends"),
    path("users/notifications/delete", views.DeleteNotification, name="deleteNotification"),
    path("users/block", views.BlockUser, name="blockUser"),
    path("users/<int:user_id>/blocked_list", views.GetUserBlockedList, name="getUserBlockedList"),
    path("users/unblock", views.UnblockUser, name="unblockUser"),
    path("get_csrf_token_and_session_id/", views.get_csrf_token_and_session_id, name="csrft_session"),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'), #for dev
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), #for dev
    path('2fa', views.generate_totp_secret, name='generate_totp_secret'),
    path('verify_totp/', views.verify_totp, name='verify_totp'),
    path('2fa-qr-page', views.two_factor_auth_qr, name='two_factor_auth_qr'),
    path('2fa-page', views.two_factor_auth, name='two_factor_auth'),
    path('recover_qr', views.recover_qr, name="recover_qr"),
    path('regenerate_qr', views.regenerate_qr_code, name="regenerate_qr"),
    path('regen_code', views.regen_code, name='regen_code'),
    path('activate/<str:code>/', views.activate_account, name='activate'),
    path('final-register', views.final_register, name='final_register'),
    path('activate-account-page', views.activate_account_page, name="activate_account_page"),
    path('auth/pre-register', views.pre_register, name="pre-register"),
    path('check_email', views.check_email, name="check_email"),
    path('pre_regen_page', views.pre_regen_page, name='pre_regen_page'),
    path('pre_regen', views.pre_regen, name='pre_regen'),
]