from django.urls import path

from . import views

urlpatterns = [
    path('createUser/', views.createUser, name='index'),
    path('updateProfile/', views.updateProfile, name='index'),
    path("chat/", views.chatbot),

    path("createCrop/", views.createCrop),
    path("deleteCrop/", views.deleteCrop),
    path("getCrops/", views.getCrops),

    path("createTask/", views.createTask),
    path("deleteTask/", views.deleteTask),
    path("getTasks/", views.getTasks),

    path("addSensor/", views.addSensor),
    path("deleteSensor/", views.deleteSensor),
    path("getSensors/", views.getSensors)
]