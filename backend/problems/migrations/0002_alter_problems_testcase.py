# Generated by Django 5.1.7 on 2025-03-21 18:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('problems', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='problems',
            name='testcase',
            field=models.TextField(blank=True, null=True),
        ),
    ]
