# Generated by Django 4.1.5 on 2023-02-03 13:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("medias", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="photo",
            name="depth_file",
            field=models.URLField(default=""),
        ),
        migrations.AddField(
            model_name="photo",
            name="seg_file",
            field=models.URLField(default=""),
        ),
    ]