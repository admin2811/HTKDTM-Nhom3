from .models import UserInfo, Course
from django.core.exceptions import ValidationError
from cloudinary.uploader import upload

def get_users_data():
    users = UserInfo.objects.all()

    return users

def add_user_data(username, password, email, image=None, courses="", target="", study=""):
    if not username or not password or not email:
        raise ValidationError("Thiếu thông tin bắt buộc!")

    if UserInfo.objects.filter(username=username).exists():
        raise ValidationError("Username đã tồn tại!")

    if UserInfo.objects.filter(email=email).exists():
        raise ValidationError("Email đã tồn tại!")

    # Xử lý upload ảnh (nếu có)
    image_url = None
    if image:
        try:
            upload_result = upload(image)
            image_url = upload_result['url']
        except Exception as e:
            raise ValueError(f"Lỗi khi tải ảnh lên Cloudinary: {str(e)}")

    # Tạo bản ghi người dùng
    return UserInfo.objects.create(
        username=username,
        password=password,
        email=email,
        image=image_url,
        courses=courses,
        target=target,
        study=study
    )