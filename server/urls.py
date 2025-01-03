from django.contrib import admin
from django.urls import path, include
from . import views
from .views import RegisterView, LoginView, PredictLearningPath

urlpatterns = [
    path('', views.home, name="home"),
    path('api/userdata', views.fetch_users_data, name="users"),
    path('api/post/userdata', views.post_user_data, name="post_userdata"),
    path('register', RegisterView.as_view(), name="register"),
    path('login', LoginView.as_view(), name="login"),
    path('api/predict-learning-path/', PredictLearningPath.as_view(), name='predict_learning_path'),

]