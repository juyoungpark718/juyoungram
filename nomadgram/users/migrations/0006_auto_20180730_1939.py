# Generated by Django 2.0.7 on 2018-07-30 10:39
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('users', '0005_auto_20180730_1939'),
    ]
    operations = [
        migrations.AlterField(
            model_name='user',
            name='gender',
            field=models.CharField(choices=[('not-specified', 'Not Specified'),
                                            ('male', 'Male'), ('male', 'Female')], max_length=80, null=True),
        ),
    ]
