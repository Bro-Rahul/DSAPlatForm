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
    
    email = models.EmailField(
        unique=True
    )
    avatar = models.CharField(null=True,blank=True) # path of the image file weather it is url or stored image assets

    providers = models.CharField(
        choices=Providers.choices,
        default=Providers.PLATFORM,
        max_length=2
    )

    def __str__(self):
        return f'{self.username}'
