# Generated by Django 5.0.6 on 2024-06-26 09:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_notification'),
    ]

    operations = [
        migrations.AddField(
            model_name='notification',
            name='date',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
