from django.urls import path

from . import views

urlpatterns = [
    path('signup/', views.signup, name='index'),
    path('signin/', views.signin, name='index'),
    path('logout/', views.logout, name='index'),
    path('createUser/', views.createUser, name='index'),
    path('updateProfile/', views.updateProfile, name='index'),
    path('checkUser/', views.checkUser, name='index'),
    path("chat/", views.chatbot)
]