from django.db import models
from django.core.validators import MinLengthValidator,MaxLengthValidator
from django.utils.text import slugify
from users.models import Users
from django.urls import reverse
from .constants import defaultcodes

class Tags(models.Model):
    tag = models.CharField(unique=True)

    def __str__(self):
        return f"{self.tag}"

class Problems(models.Model):

    class Level(models.TextChoices):
        EASY = "E","Easy"
        MEDUIUM = "M","Medium"
        HARD = "H","Hard"

    user = models.ForeignKey(Users,related_name="Problems",on_delete=models.SET_NULL,null=True,blank=True)
    title = models.CharField(unique=True,validators=[MinLengthValidator(5,"Title should be Atleast 5 letters long!"),MaxLengthValidator(100,"Title is too long max letters 100")])
    description = models.TextField()
    level = models.CharField(choices=Level.choices,max_length=1)
    slug = models.SlugField(blank=True,null=True)
    hints = models.TextField(null=True,blank=True)
    tags = models.ManyToManyField(Tags,related_name="problem_tags")
    testcases = models.TextField()
    starter_codes = models.JSONField(default=defaultcodes)
    solution_codes = models.JSONField(default=defaultcodes)


    def save(self,*args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        return super().save(*args, **kwargs)

    
    def __str__(self):
        return f"{self.title}"