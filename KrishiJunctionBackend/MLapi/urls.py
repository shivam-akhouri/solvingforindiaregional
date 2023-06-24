from django.urls import path

from . import views

urlpatterns = [
    path('yeild_prediction/', views.yeild_prediction),
    path("ndvi/", views.ndvi),
    path("testimage/", views.testimageinput)
]