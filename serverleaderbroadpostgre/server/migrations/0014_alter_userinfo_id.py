# Generated by Django 5.1.4 on 2025-01-09 16:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0013_questionresult'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userinfo',
            name='id',
            field=models.BigAutoField(primary_key=True, serialize=False),
        ),
    ]
