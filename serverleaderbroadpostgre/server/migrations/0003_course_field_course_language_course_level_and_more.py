# Generated by Django 5.1.4 on 2025-01-01 15:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0002_rename_date_userinfo_date_joined_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='field',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='course',
            name='language',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='course',
            name='level',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='course',
            name='target',
            field=models.TextField(blank=True, null=True),
        ),
    ]
