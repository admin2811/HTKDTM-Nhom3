# Generated by Django 5.1.4 on 2025-01-07 13:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0007_remove_course_field_remove_course_language_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='field',
            field=models.CharField(default='null', max_length=255),
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
            field=models.CharField(default='none', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='course',
            name='total_enrollments',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
