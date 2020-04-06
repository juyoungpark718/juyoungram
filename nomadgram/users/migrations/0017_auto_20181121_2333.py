# Generated by Django 2.0.7 on 2018-11-21 14:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0016_auto_20180806_2220'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='push_token',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='user',
            name='gender',
            field=models.CharField(choices=[('male', 'Male'), ('female', 'Female'), ('not-specified', 'Not specified')], max_length=80, null=True),
        ),
    ]
