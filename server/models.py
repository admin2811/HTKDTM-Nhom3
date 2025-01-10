from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager,PermissionsMixin
from cloudinary.models import CloudinaryField
from server.manager import UserManager
from rest_framework_simplejwt.tokens import RefreshToken

# class UserManager(BaseUserManager):
#     def create_user(self, username, email, password=None, **extra_fields):
#         if not email:
#             raise ValueError("The Email field is required")
#         if not username:
#             raise ValueError("The Username field is required")

#         email = self.normalize_email(email)
#         user = self.model(username=username, email=email, **extra_fields)
#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, username, email, password=None, **extra_fields):
#         extra_fields.setdefault("is_staff", True)
#         extra_fields.setdefault("is_superuser", True)

#         return self.create_user(username, email, password, **extra_fields)

class UserInfo(AbstractBaseUser,PermissionsMixin):
    id = models.BigAutoField(primary_key=True)
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    image = CloudinaryField('image', blank=True, null=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    field = models.TextField(blank=True, null=True)
    language = models.TextField(blank=True, null=True)
    target = models.TextField(blank=True, null=True)
    level = models.TextField(blank=True, null=True)
    time_study = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    objects = UserManager()
    USERNAME_FIELD='username'
    REQUIRED_FIELDS = ['password']

    def tokens(self):    
        refresh = RefreshToken.for_user(self)
        return {
            "refresh":str(refresh),
            "access":str(refresh.access_token)
        }

    def __str__(self):
        return self.username or self.password
    @property
    def get_full_name(self):
        return f"{self.username} - {self.email}"
# class UserInfo(models.Model):
#     username = models.CharField(max_length=255, unique=True)
#     password = models.CharField(max_length=255)
#     email = models.EmailField(unique=True)
#     image = CloudinaryField('image', blank=True, null=True)  # Sử dụng CloudinaryField
#     date = models.DateTimeField(auto_now_add=True)
#     courses = models.TextField(blank=True, null=True)
#     target = models.TextField(blank=True, null=True)
#     study = models.TextField(blank=True, null=True)

#     def __str__(self):
#         return self.username
    
# class Category(models.Model):
#     name = models.CharField(max_length=100)

#     def __str__(self):
#         return self.name
    
class Course(models.Model):
    id = models.BigAutoField(primary_key=True)
    course_name = models.CharField(max_length=255)
    description = models.TextField()
    image = CloudinaryField('image', blank=True, null=True)  # Trường hình ảnh sử dụng Cloudinary
    number_of_lessons = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    field = models.CharField(max_length=255)
    language = models.CharField(max_length=255)
    level = models.CharField(max_length=255)
    duration = models.DurationField()
    standard = models.CharField(max_length=255)
    total_enrollments = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return self.course_name
class Lesson(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    videoId = models.CharField(max_length=255)
    id_course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lessons')

    def __str__(self):
        return self.title

class Router(models.Model):
    name = models.CharField(max_length=255)
    content = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class Quizz(models.Model):
    question = models.TextField()
    option1 = models.TextField()
    option2 = models.TextField()
    option3 = models.TextField()
    option4 = models.TextField()
    ans = models.TextField()
    id_lesson = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='quizzes')

    def __str__(self):
        return self.question

class UserCourse(models.Model):
    user = models.ForeignKey('UserInfo', on_delete=models.CASCADE, related_name='user_courses')
    course = models.ForeignKey('Course', on_delete=models.CASCADE, related_name='user_courses')
    result = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    enrolled_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.course.course_name} - {self.result}"
    
class QuestionResult(models.Model):
    id = models.AutoField(primary_key=True)
    id_course = models.CharField(max_length=255)
    question_number = models.CharField(max_length=255)
    result = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.id_course} - Question {self.question_number} - {self.result}"