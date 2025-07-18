from django.db.models import F, Q, Count, OuterRef,Sum, Subquery, Case, When, Value, BooleanField, CharField
from django.db.models.functions import Concat
from django.db import connection
from comments.models import Comments, LikeDislike
from submissions.models import Submissions
from problems.models import Tags,Problems
from pprint import pprint
from solutions.models import Solutions

def query():
    user_id = 3

    # Subquery: Get whether the current user liked the comment
    user_vote_subquery = LikeDislike.objects.filter(
        comment=OuterRef('pk'),
        user_id=3
    ).values('isLiked')[:1]  # will return True, False, or None

    # Annotate using CASE
    data = Comments.objects.annotate(
        raw_vote=Subquery(user_vote_subquery, output_field=BooleanField()),
        user_vote=Case(
            When(raw_vote=True, then=Value('Liked')),
            When(raw_vote=False, then=Value('Disliked')),
            default=Value('No Vote'),
            output_field=CharField()
        ),
        likes=Count("votes", filter=Q(votes__isLiked=True)),
        dislike=Count("votes", filter=Q(votes__isLiked=False))
    )

    for item in data:
        print(f"Likes: {item.likes}, Dislikes: {item.dislike}, User Vote: {item.user_vote}, Comment: {item.comment}")

def submission():
    submissions = Submissions.objects.all()
    for item in submissions:
        print(f"id {item.pk}")


def get_solution_pertag():
    problem = Problems.objects.get(slug='find-min')
    tags = problem.solutions.values("tags__tag").annotate(
        count = Count("pk"),
        lang = F("tags__tag"),
        formatted=Concat(F("tags__tag"), Value("-"),F("count"),output_field=CharField())
    ).values("lang","count")
    for item in tags:
        print(f"{item} ")
    

def run():
    get_solution_pertag()