# Generated by Django 5.1.4 on 2025-01-08 06:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0009_lesson'),
    ]

    operations = [
        migrations.CreateModel(
            name='Router',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('content', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Quizz',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.TextField()),
                ('option1', models.TextField()),
                ('option2', models.TextField()),
                ('option3', models.TextField()),
                ('option4', models.TextField()),
                ('ans', models.TextField()),
                ('id_lesson', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='quizzes', to='server.course')),
            ],
        ),
    ]
