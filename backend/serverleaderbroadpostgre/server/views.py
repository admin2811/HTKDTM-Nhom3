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
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import EmailMessage
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from django.urls import reverse
from django.contrib.sites.shortcuts import get_current_site
from server.models import UserInfo
from django.utils.encoding import smart_bytes,smart_str
from .serializers import UserRegisterSerializer, UserLoginSerializer
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