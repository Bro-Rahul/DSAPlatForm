from problems.models import Problems
from users.models import Users
from comments.models import Comments,LikeDislike
from django.db.models import F,Q,Count

def query():
    data = Comments.objects.annotate(likes=Count("votes",filter=Q(votes__isLiked=True)),dislike=Count("votes",filter=Q(votes__isLiked=False)))
    for item in data:
        print(f"{item.likes} - {item.dislike}")
    print(LikeDislike.objects.values().aggregate())

def run():
    query()