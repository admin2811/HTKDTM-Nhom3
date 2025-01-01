from django.db import models
from cloudinary.models import CloudinaryField

class UserInfo(models.Model):
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    image = CloudinaryField('image', blank=True, null=True)  # Sử dụng CloudinaryField
    date = models.DateTimeField(auto_now_add=True)
    courses = models.TextField(blank=True, null=True)
    target = models.TextField(blank=True, null=True)
    study = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.username
    
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