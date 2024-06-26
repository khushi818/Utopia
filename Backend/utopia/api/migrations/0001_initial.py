# Generated by Django 4.1.7 on 2023-04-13 18:29

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(default=api.models.generate_unique_code, max_length=8, unique=True)),
                ('host', models.CharField(default=None, max_length=50)),
                ('name', models.CharField(default=None, max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
