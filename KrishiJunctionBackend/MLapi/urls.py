from django.urls import path

from . import views

urlpatterns = [
    path('yeild_prediction/', views.yeild_prediction),
]