from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.text import get_text_list as _

class Users(AbstractUser):
    class Providers(models.TextChoices):
        GOOGLE = "G","GOOGLE",
        GITHUB = "GH","GITHUB"
        PLATFORM = "P","DSA PLATFORM"

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ["username"]

    username = models.CharField(
        _("username"),
        max_length=150,
        unique=False,
    )
    avatar = models.ImageField(
        upload_to="media/profile",
        null=True,
        blank=True
    )
    email = models.EmailField(
        unique=True
    )

    providers = models.CharField(
        choices=Providers.choices,
        default=Providers.PLATFORM,
        max_length=2
    )

