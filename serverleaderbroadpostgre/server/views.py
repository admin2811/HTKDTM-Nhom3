from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from .controller import get_users_data, add_user_data, predict_learning_path
from django.views.decorators.csrf import csrf_exempt # type: ignore
import json
from django.core.exceptions import ValidationError
from .models import Course
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import EmailMessage
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status, viewsets
from django.urls import reverse
from django.contrib.sites.shortcuts import get_current_site
from server.models import UserInfo
from django.utils.encoding import smart_bytes,smart_str
from django.db.models import Avg
from .serializers import UserRegisterSerializer, UserLoginSerializer, RouterSerializer
from .recommend_course import RecommendCourse
import pandas as pd
from datetime import timedelta
import json
from .models import Course, Lesson, Router, UserCourse
from .apps import rdf

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

class PasswordResetRequestView(APIView):
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = get_object_or_404(UserInfo, email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            current_site = get_current_site(request).domain
            reset_link = reverse('reset-password-confirm', kwargs={'uidb64': uidb64, 'token': token})
            abs_url = f'http://{current_site}{reset_link}'

            email_body = f'Hi {user.username},\nUse the link below to reset your password:\n{abs_url}'
            email = EmailMessage(
                subject="Reset your Password",
                body=email_body,
                to=[user.email],
            )
            email.send()
            
            return Response({'message': 'Password reset link sent to email'}, status=status.HTTP_200_OK)
        except UserInfo.DoesNotExist:
            return Response({'error': 'User with this email does not exist'}, status=status.HTTP_400_BAD_REQUEST)
            
class PasswordResetConfirmView(APIView):
    def post(self, request, uidb64, token):
        try:
            user_id = smart_str(urlsafe_base64_decode(uidb64))
            user = get_object_or_404(UserInfo, id=user_id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'error': 'Token is invalid or expired'}, status=status.HTTP_400_BAD_REQUEST)

            new_password = request.data.get('password')
            if not new_password:
                return Response({'error': 'Password is required'}, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(new_password)
            user.save()
            return Response({'message': 'Password reset successfully'}, status=status.HTTP_200_OK)

        except Exception:
            return Response({'error': 'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)
# Create your views here.
class RouterViewSet(viewsets.ModelViewSet):
    queryset = Router.objects.all()
    serializer_class = RouterSerializer

class PredictLearningPath(APIView):
    def post(self, request):
        try:
            # Lấy dữ liệu từ request
            features = {
                'Mục tiêu chính khi học lập trình': request.data.get('target'),
                'Dự định làm dự án cá nhân': request.data.get('personal'),
                'Kinh nghiệm lập trình': request.data.get('experience'),
                'Ngôn ngữ lập trình đã học': request.data.get('language'),
                'Thời gian muốn hoàn thành lộ trình': request.data.get('study')
            }

            # Kiểm tra dữ liệu đầu vào
            if not all(features.values()):
                return Response({"error": "Thiếu dữ liệu đầu vào."}, status=status.HTTP_400_BAD_REQUEST)

            # Gọi hàm trong controller để dự đoán
            result = predict_learning_path(features)

            if "error" in result:
                return Response({"error": result["error"]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response(result, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
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

@csrf_exempt
def lessons_of_course(request, course_id):
    if request.method == "GET":
        lessons = Lesson.objects.filter(id_course_id=course_id)
        lessons_data = list(lessons.values())
        return JsonResponse({'lessons': lessons_data}, safe=False)
    
@csrf_exempt
def evaluate_mark(request):
    global rdf
    if request.method == "POST":
        try:
            body = json.loads(request.body.decode('utf-8'))
            user_id = body.get('user_id')

            # Kiểm tra user_id
            if not user_id:
                return JsonResponse({"error": "User ID is required."}, status=400)

            try:
                # Lấy thông tin user
                user = UserInfo.objects.get(id=user_id)
            except UserInfo.DoesNotExist:
                return JsonResponse({"error": "User not found."}, status=404)

            # Lấy ngôn ngữ của user
            user_language = user.language if user.language else None
            if not user_language:
                return JsonResponse({"error": "User does not have a language set."}, status=400)

            # Lấy các khóa học phù hợp
            user_courses = UserCourse.objects.filter(user=user)
            matching_courses = user_courses.filter(course__language__iexact=user_language)

            if not matching_courses.exists():
                return JsonResponse({"message": "No courses match the user's language."}, status=200)

            # Tính result trung bình
            average_result = matching_courses.aggregate(average_result=Avg('result'))['average_result']

            user_language = user_language.lower()

            data_test = pd.DataFrame({
                "avg_score": [average_result],
                "target_language": [user_language]
            })

            predicted_rank = rdf.predict(data_test)

            reponse_data = {
                "user_id": user_id,
                "average_result": average_result,
                "predicted_rank": predicted_rank[0]
            }

            return JsonResponse({
                "message": "Recommended course",
                "data": reponse_data
            }, status=200)
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({"error": "Invalid request method."}, status=405)