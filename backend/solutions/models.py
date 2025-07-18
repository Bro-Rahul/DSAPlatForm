from django.db import models
from django.core.validators import MinLengthValidator,MaxLengthValidator
from problems.models import Tags,Problems
from users.models import Users


class Solutions(models.Model):

    title = models.CharField(
                null=False,
                blank=False,
                validators=[MinLengthValidator(5,"Title is too small"),MaxLengthValidator(300,"Title is too large limit (300) letters")]
            )

    tags = models.ManyToManyField(
                Tags,
                related_name="solutions",
            )
    
    problem = models.ForeignKey(
                Problems,
                related_name="solutions",
                on_delete=models.CASCADE
            )
    
    user = models.ForeignKey(
                Users,
                related_name="solutions",
                on_delete=models.CASCADE
            )
    
    solution_text = models.TextField(blank=False,null=False)

    def __str__(self):
        return f"{self.title} by ->{self.user.username}"