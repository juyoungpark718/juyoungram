# Generated by Django 2.0.7 on 2018-08-06 12:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0012_auto_20180806_2059'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='gender',
            field=models.CharField(choices=[('not-specified', 'Not Specified'), ('male', 'Female'), ('male', 'Male')], max_length=80, null=True),
        ),
    ]
