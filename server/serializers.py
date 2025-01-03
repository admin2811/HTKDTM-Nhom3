from rest_framework import serializers
from .models import UserInfo
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.tokens import PasswordResetTokenGenerator
class UserRegisterSerializer(serializers.ModelSerializer):
    password=serializers.CharField(max_length=255, min_length=6, write_only=True)
    class Meta:
        model = UserInfo
        fields = ['id', 'username', 'email', 'password', 'image', 'field','language', 'target','level', 'time_study']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    def validate(self, attrs):
        return super().validate(attrs)
    def create(self, validated_data):
        user=UserInfo.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=make_password(validated_data['password']),
            field=validated_data['field'],
            language=validated_data['language'],
            target=validated_data['target'],
            level=validated_data['level'],
            time_study=validated_data['time_study']
        )
        return user


class UserLoginSerializer(serializers.ModelSerializer):
    username=serializers.CharField(max_length=255)
    password=serializers.CharField(max_length=255, min_length=6, write_only=True)
    access_token=serializers.CharField(max_length=255, read_only=True)
    refresh_token=serializers.CharField(max_length=255, read_only=True)
    class Meta:
        model=UserInfo
        fields=['username', 'password', 'access_token', 'refresh_token']
    def validate(self, attrs):
        password=attrs.get('password')
        username=attrs.get('username')
        request=self.context.get('request')
        print(password, request)
        user=authenticate(request, username=username, password=password)
        print(user)
        if not user:
            raise AuthenticationFailed("invalid credential try again")
        if not user.is_active:
            raise AuthenticationFailed("Account is not active")
        tokens=user.tokens()
        return {
            'username':user.username,
            'full_name':user.get_full_name,
            "access_token":str(tokens.get('access')),
            "refresh_token":str(tokens.get('refresh'))
        }

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = ['id', 'username', 'email', 'image', 'date', 'courses', 'target', 'study']
