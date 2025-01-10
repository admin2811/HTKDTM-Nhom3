from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from .controller import get_users_data, add_user_data, predict_learning_path
from django.views.decorators.csrf import csrf_exempt # type: ignore
import json
from django.core.exceptions import ValidationError
from .models import Course, Quizz, UserCourse
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
from .serializers import UserRegisterSerializer, UserLoginSerializer, RouterSerializer
from .recommend_course import RecommendCourse
import pandas as pd
from datetime import timedelta
import json
from .models import Course, Lesson, Router
from payos import PaymentData, PayOS
import os
from rest_framework.decorators import api_view
import random
from django.views.decorators.csrf import csrf_exempt
import yt_dlp
import whisper
import torch
import os
from .apps import rdf
from django.db.models import Avg
from .supersetchart import superset_host, username, password, chart_id, get_chart_data
import warnings
warnings.filterwarnings("ignore", category=UserWarning, module="whisper")
warnings.filterwarnings("ignore", category=FutureWarning, module="torch")

# Cấu hình yt-dlp
yt_dlp_opts = {
    'outtmpl': 'output.mp4',   # Đặt tên tệp tải về là 'output.mp4'
    'format': 'best',          # Tải video và âm thanh tốt nhất
    'noplaylist': True,
    'continue': True,
}

# Hàm tải video từ YouTube
def download_video(url):
    try:
        with yt_dlp.YoutubeDL(yt_dlp_opts) as ydl:
            ydl.download([url])
    except Exception as e:
        print(f"Error downloading video: {e}")
        return False
    return True

# Hàm chuyển đổi video thành văn bản
def transcribe_video(model_name):
    try:
        device = 'cuda' if torch.cuda.is_available() else 'cpu'
        model = whisper.load_model(model_name).to(device)  # Tải mô hình Whisper
        result = model.transcribe("output.mp4")  # Chuyển đổi âm thanh trong video thành văn bản
        return result['text']
    except Exception as e:
        print(f"Error transcribing video: {e}")
        return None

# API nhận URL và trả về bản ghi âm
@csrf_exempt
def transcribe_video_api(request):
    if request.method == "POST":
        # Lấy URL từ request
        url = request.POST.get('videoUrl')
        print(url)
        if url:

            if download_video(url):
                transcription_result = transcribe_video("base")  # Model 'base' là một mô hình nhỏ, có thể thay đổi
                if transcription_result:
                    return JsonResponse({'status': 'success', 'transcription': transcription_result})
                else:
                    return JsonResponse({'status': 'error', 'message': 'Error transcribing video'})
            else:
                return JsonResponse({'status': 'error', 'message': 'Error downloading video'})
        else:
            return JsonResponse({'status': 'error', 'message': 'No URL provided'})
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})
    
payOS = PayOS(
    client_id=os.environ.get('PAY_OS_CLIENT'),
    api_key=os.environ.get('PAYOS_API_KEY'),
    checksum_key=os.environ.get('PAYOS_CHECKSUM_KEY')
) 
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
def register_user_course(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))

        user_name = data.get('user_name')
        course_id = data.get('course_id')

        try:
            # Lấy người dùng theo username
            user = UserInfo.objects.get(username=user_name)
            course = Course.objects.get(id=course_id)
        
            if UserCourse.objects.filter(user=user, course=course).exists():
                return JsonResponse({"error": "User already enrolled in this course."}, status=400)

            user_course = UserCourse(
                user=user,
                course=course,
            )
            user_course.save()

            return JsonResponse({"message": "User course registered successfully."}, status=201)

        except UserInfo.DoesNotExist:
            return JsonResponse({"error": "User not found."}, status=404)
        except Course.DoesNotExist:
            return JsonResponse({"error": "Course not found."}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request method."}, status=400)


@csrf_exempt
def update_result_user_course(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))

        user_name = data.get('user_name')
        course_id = data.get('course_id')
        result = data.get('result')

        try:
            user = UserInfo.objects.get(username=user_name)
            user_course = UserCourse.objects.get(user=user, course_id=course_id)

            total_questions = Quizz.objects.filter(id_lesson__id=course_id).count()

            print(total_questions)

            calculated_result = (result / total_questions) * 10

            user_course.result = calculated_result
            user_course.save()

            return JsonResponse({"message": "User course result updated successfully."}, status=200)

        except UserInfo.DoesNotExist:
            return JsonResponse({"error": "User not found."}, status=404)
        except UserCourse.DoesNotExist:
            return JsonResponse({"error": "User course not found."}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request method."}, status=400)

@csrf_exempt
def evaluate_mark(request):
    if request.method == "POST":
        try:
            body = json.loads(request.body.decode('utf-8'))
            user_name = body.get('user_name')

            # Kiểm tra user_name
            if not user_name:
                return JsonResponse({"error": "Username is required."}, status=400)

            try:
                user = UserInfo.objects.get(username=user_name)
            except UserInfo.DoesNotExist:
                return JsonResponse({"error": "User not found."}, status=404)

            user_language = user.language if user.language else None
            if not user_language:
                return JsonResponse({"error": "User does not have a language set."}, status=400)

            user_courses = UserCourse.objects.filter(user=user)
            matching_courses = user_courses.filter(course__language__iexact=user_language)

            if not matching_courses.exists():
                return JsonResponse({"message": "No courses match the user's language."}, status=200)

            average_result = matching_courses.aggregate(average_result=Avg('result'))['average_result']

            user_language = user_language.lower()

            data_test = pd.DataFrame({
                "avg_score": [average_result],
                "target_language": [user_language]
            })

            predicted_rank = rdf.predict(data_test)

            response_data = {
                "user_name": user_name,
                "average_result": average_result,
                "predicted_rank": predicted_rank[0]
            }

            return JsonResponse({
                "message": "Recommended course",
                "data": response_data
            }, status=200)
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({"error": "Invalid request method."}, status=405)

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
def quizz_of_lesson(request, lesson_id):
    if request.method == "GET":
        quizz = Quizz.objects.filter(id_lesson_id=lesson_id)
        quizz_data = list(quizz.values())
        return JsonResponse({'quizz': quizz_data}, safe=False)

@api_view(['POST'])
def create_payment(request):
    domain = "http://localhost:5173/"
    try:
        paymentData = PaymentData(
            orderCode=random.randint(1000, 99990),
            amount=10000,
            description="demo",
            cancelUrl=f"{domain}/dashboard",
            returnUrl=f"{domain}/dashboard"
        )
        payosCreatPayment = payOS.cancelPaymentLink(paymentData)
        return Response(payosCreatPayment.to_json())
    except Exception as e:
        return Response({'error': str(e)}, status=403)


def draw_chart_1(request):
    if request.method == "GET":
        data = get_chart_data(chart_id, superset_host, username, password)

        return JsonResponse({"message": "Query chart successfully.", "data": data}, status=200)

    return JsonResponse({"error": "Error."}, status=400)