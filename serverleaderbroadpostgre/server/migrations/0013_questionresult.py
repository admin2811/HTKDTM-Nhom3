# Generated by Django 5.1.4 on 2025-01-09 04:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0012_usercourse'),
    ]

    operations = [
        migrations.CreateModel(
            name='QuestionResult',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('id_course', models.CharField(max_length=255)),
                ('question_number', models.CharField(max_length=255)),
                ('result', models.CharField(max_length=10)),
            ],
        ),
    ]
