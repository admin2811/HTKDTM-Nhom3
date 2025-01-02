from rest_framework import serializers
from .models import UserInfo
from django.contrib.auth.hashers import make_password


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = ['id', 'username', 'email', 'password', 'image', 'field','language', 'target','level', 'time_study']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = ['id', 'username', 'email', 'image', 'date', 'courses', 'target', 'study']