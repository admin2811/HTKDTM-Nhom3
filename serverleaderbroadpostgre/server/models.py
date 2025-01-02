from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from cloudinary.models import CloudinaryField

class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field is required")
        if not username:
            raise ValueError("The Username field is required")

        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        return self.create_user(username, email, password, **extra_fields)

class UserInfo(AbstractBaseUser):
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

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username
    
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
    field = models.CharField(max_length=255)
    language = models.CharField(max_length=255)
    level = models.CharField(max_length=255)
    duration = models.DurationField()
    
    def __str__(self):
        return self.course_name