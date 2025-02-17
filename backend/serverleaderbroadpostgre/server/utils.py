from django.core.mail import EmailMessage
import random
from django.conf import settings
from server.models import UserInfo
from django.contrib.sites.shortcuts import get_current_site

def send_normal_email(data):
    email=EmailMessage(
        subject=data['email_subject'],
        body=data['email_body'],
        from_email=settings.EMAIL_HOST_USER,
        to=[data['to_email']]
    )
    email.send()