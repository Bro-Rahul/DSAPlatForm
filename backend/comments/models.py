from django.db import models
from problems.models import Problems
from users.models import Users
from datetime import datetime

class Comments(models.Model):

    class CommentType(models.TextChoices):
        TIP = "tip",
        HINT = "hint",
        FEEDBACK = "feedback"


    comment = models.TextField()

    user =  models.ForeignKey(
            Users,
            on_delete=models.CASCADE,
            related_name="comments"
        )
    
    problem = models.ForeignKey(
                Problems, 
                on_delete=models.CASCADE,
                related_name="comments"
            )

    comment_type = models.CharField(
                    choices=CommentType.choices,
                    default=CommentType.TIP
                )
    
    subcomment_id = models.ForeignKey(
                        "self", 
                        on_delete=models.CASCADE,
                        related_name="subcomments",
                        null=True,
                        blank=True
                    )
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.comment} on {self.problem.title} by {self.user.username}"