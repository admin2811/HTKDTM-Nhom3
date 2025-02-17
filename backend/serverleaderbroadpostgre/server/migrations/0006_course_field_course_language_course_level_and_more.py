# Generated by Django 5.1.4 on 2025-01-03 15:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0005_userinfo_groups_userinfo_user_permissions'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='field',
            field=models.CharField(default='none', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='course',
            name='language',
            field=models.CharField(default='none', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='course',
            name='level',
            field=models.CharField(default='none', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='course',
            name='standard',
            field=models.CharField(default='normal', max_length=255),
            preserve_default=False,
        ),
    ]
