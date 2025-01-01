from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from .controller import get_users_data, add_user_data
from django.views.decorators.csrf import csrf_exempt # type: ignore
import json
from django.core.exceptions import ValidationError
from .models import Course
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserRegisterSerializer, UserLoginSerializer
from django.contrib.auth import authenticate
class RegisterView(APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user=serializer.data
            return Response({"data":user,"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LoginView(GenericAPIView):
    serializer_class=UserLoginSerializer
    def post(self, request):
        serializer= self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# Create your views here.
def home(request):
    return HttpResponse('Welcome to server postgreSQL')

@csrf_exempt
def fetch_users_data(request):
    if request.method == "GET":
        users = get_users_data()

        users = list(users.values())

        return JsonResponse(users, safe=False)
    
@csrf_exempt
def post_user_data(request):
    if request.method == "POST":
        try:
            body = request.POST  # Lấy dữ liệu từ form
            image = request.FILES.get("image")  # Lấy file ảnh từ request
            username = body.get("username")
            password = body.get("password")
            email = body.get("email")
            courses = body.get("courses", "")
            target = body.get("target", "")
            study = body.get("study", "")
            # Gọi controller để thêm người dùng
            user_info = add_user_data(username, password, email, image, courses, target, study)
            return JsonResponse({
                "message": "Tạo người dùng thành công!",
                "user_id": user_info.id
            }, status=201)

        except Exception as e:
            return JsonResponse({"error": f"Có lỗi xảy ra: {str(e)}"}, status=500)

    return JsonResponse({"error": "Phương thức không được hỗ trợ!"}, status=405)