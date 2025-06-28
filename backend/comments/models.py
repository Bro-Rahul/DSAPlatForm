from django.db import models
from problems.models import Problems
from users.models import Users

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
    

class LikeDislike(models.Model):

    user = models.ForeignKey(Users, on_delete=models.CASCADE,related_name="comment")
    comment = models.ForeignKey(Comments, on_delete=models.CASCADE, related_name='votes')
    isLiked = models.BooleanField(null=True,blank=True)

    class Meta:
        unique_together = ('user', 'comment')  

    def __str__(self):
        return f'{self.user.username} voted {"Like" if self.isLiked == 1 else "Dislike"}'