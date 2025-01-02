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
    course_name = models.CharField(max_length=255)
    description = models.TextField()
    image = CloudinaryField('image', blank=True, null=True)  # Trường hình ảnh sử dụng Cloudinary
    number_of_lessons = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration = models.DurationField()
    # categories = models.ManyToManyField(Category, related_name='courses')
    
    def __str__(self):
        return self.course_name