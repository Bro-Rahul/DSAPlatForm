from django.db import models
from users.models import Users
from problems.models import Problems

class Submissions(models.Model):
    class Language(models.TextChoices):
        JAVA = "java",
        PYTHON = "python"
        CPP = "cpp"
        JAVASCRIPT = "javascript"

    class Status(models.TextChoices):
        ACCEPTED = "accepted",
        REJECTED = "attempted"

    created_at = models.DateTimeField(
        auto_now_add=True
    )
    user = models.ForeignKey(
        Users,
        related_name='submissions',
        on_delete=models.CASCADE
    )
    problem = models.ForeignKey(
        Problems,
        on_delete=models.CASCADE,
        related_name="submissions"
    )
    submission_code = models.TextField(
        null=False,
        blank=False
    )
    submission_lang = models.CharField(
        choices=Language.choices,
        null=False,
        blank=False
    )
    status = models.CharField(
        choices=Status.choices,
    )
    details = models.JSONField(default=dict)

    def __str__(self):
        return f"{self.problem.title} by {self.user.username}"