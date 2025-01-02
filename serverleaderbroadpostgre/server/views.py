from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from .controller import get_users_data, add_user_data
from django.views.decorators.csrf import csrf_exempt # type: ignore
from django.utils.decorators import method_decorator
from datetime import timedelta
import json
from django.core.exceptions import ValidationError
from .models import Course
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserRegisterSerializer, UserLoginSerializer
from django.contrib.auth import authenticate
from .recommend_course import RecommendCourse
import pandas as pd

class RegisterView(APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LoginView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(request, email=email, password=password)
            if user:
                refresh = RefreshToken.for_user(user)
                return Response({
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                }, status=status.HTTP_200_OK)
            return Response({"error": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
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
            # Lấy dữ liệu từ form
            body = json.loads(request.body)  # Lấy file ảnh từ request

            username = body.get("username")
            password = body.get("password")
            email = body.get("email")
            courses = body.get("courses", "")
            target = body.get("target", "")
            study = body.get("study", "")

            # Gọi controller để thêm người dùng
            user_info = add_user_data(username, password, email)

            return JsonResponse({
                "message": "Tạo người dùng thành công!",
                "user_id": user_info.id
            }, status=201)

        except Exception as e:
            return JsonResponse({"error": f"Có lỗi xảy ra: {str(e)}"}, status=500)

    return JsonResponse({"error": "Phương thức không được hỗ trợ!"}, status=405)

@csrf_exempt
def read_courses(request):
    user_data = {
        'username': 'Lam',
        'field': 'Data Science',
        'language': 'Python',
        'target': 'Machine Learning',
        'level': 'Intermediate'
    }

    user_data = pd.DataFrame([user_data])

    recommender = RecommendCourse(user_data)
    print(recommender.read_data_train())

    return HttpResponse('Đọc cái con cặc')

@csrf_exempt
def create_courses(request):
    if request.method == "POST":
        try:
            # Parse JSON data từ request body
            data = json.loads(request.body.decode('utf-8'))
            
            courses = []
            for item in data:
                # Chuyển đổi thời lượng từ chuỗi sang timedelta
                duration_parts = list(map(int, item.get('duration', '00:00:00').split(':')))
                duration = timedelta(hours=duration_parts[0], minutes=duration_parts[1], seconds=duration_parts[2])
                
                course = Course(
                    course_name=item.get('name'),
                    description=item.get('description'),
                    image=item.get('image'),
                    number_of_lessons=item.get('number_of_lessons'),
                    price=item.get('price'),
                    field=item.get('field'),
                    language=item.get('language'),
                    level=item.get('level'),
                    duration=duration,
                )
                courses.append(course)
            
            # Bulk create
            Course.objects.bulk_create(courses)
            
            return JsonResponse({'message': 'Courses created successfully', 'count': len(courses)}, status=201)
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    
    return JsonResponse({'error': 'Invalid HTTP method'}, status=405)

@csrf_exempt
def recommended_courses(request):
    if request.method == "POST":
        try:
            user = json.loads(request.body.decode('utf-8'))
            
            user = pd.DataFrame([user])

            user.astype(str)

            recommender = RecommendCourse(user)

            recommended_list = recommender.train()

            recommended_list = recommended_list.to_json(orient='records')

            return JsonResponse({'message': 'Recommended course', "data": recommended_list}, status=201)
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    
    return JsonResponse({'error': 'Invalid HTTP method'}, status=405)