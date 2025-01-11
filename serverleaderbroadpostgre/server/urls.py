from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import RegisterView, LoginView, PasswordResetRequestView, PasswordResetConfirmView, RouterViewSet,PredictLearningPath
router = DefaultRouter()
router.register(r'routers', RouterViewSet, basename='router')
urlpatterns = [
    path('', views.home, name="home"),
    path('api/userdata', views.fetch_users_data, name="users"),
    path('api/post/userdata', views.post_user_data, name="post_userdata"),
    path('register', RegisterView.as_view(), name="register"),
    path('login', LoginView.as_view(), name="login"),
    path('forgot_password',PasswordResetRequestView.as_view(), name="forgot_password"),
    path('reset-password-confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='reset-password-confirm'),
    path('api/test/read_data_train', views.read_courses, name="read_course"),
    path('api/add_courses/', views.create_courses, name='create_course'),
    path('api/recommended_course/', views.recommended_courses, name='recommended_course'),
    path('lessons/<int:course_id>/', views.lessons_of_course, name='lessons_of_course'),
    path('api/', include(router.urls)),
    path('api/predict-learning-path/', PredictLearningPath.as_view(), name='predict_learning_path'),
    path('quizz/<int:lesson_id>/', views.quizz_of_lesson, name='quizz_of_lesson'),
    path('api/create_payment_link', views.create_payment, name='create_payment'),
    path('api/transcribeByUrl', views.transcribe_video_api, name='transcribe_video_by_url'),
    path('register_course', views.register_user_course, name='register_course'),
    path('post_result', views.update_result_user_course, name='post_result'),
    path('api/evaluate_mark', views.evaluate_mark, name='evaluate_mark'),
    path('api/draw_chart_1', views.draw_chart_1, name='post_result'),
]