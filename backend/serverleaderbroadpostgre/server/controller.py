from .models import UserInfo, Course
from django.core.exceptions import ValidationError
import joblib
from cloudinary.uploader import upload
import pandas as pd
import numpy as np
import os
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

# Lấy đường dẫn đầy đủ đến thư mục chứa controller.py
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Xây dựng đường dẫn đầy đủ đến tệp learning_path_model.pkl
model_path = os.path.join(BASE_DIR, 'learning_path_model.pkl')
label_path = os.path.join(BASE_DIR, 'label_encoders.pkl')
# Tải mô hình
model = joblib.load(model_path)
label_encoders = joblib.load(label_path)

def predict_learning_path(features):
    try:
        # Chuẩn bị dữ liệu
        new_data = pd.DataFrame([features])

        # Encode dữ liệu bằng các encoders
        for col, le in label_encoders.items():
            new_data[col] = new_data[col].apply(lambda x: x if x in le.classes_ else 'unknown')
            if 'unknown' not in le.classes_:
                le.classes_ = np.append(le.classes_, 'unknown')
            new_data[col] = le.transform(new_data[col])

        # Dự đoán
        predicted_path = model.predict(new_data)
        return {"predicted_path": predicted_path[0]}

    except Exception as e:
        return {"error": str(e)}