# Generated by Django 5.1.4 on 2025-01-08 07:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0010_router_quizz'),
    ]

    operations = [
        migrations.AlterField(
            model_name='router',
            name='content',
            field=models.TextField(blank=True, null=True),
        ),
    ]
