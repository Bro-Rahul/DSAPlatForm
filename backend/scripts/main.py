from django.db.models import F, Q, Count, OuterRef, Subquery, Case, When, Value, BooleanField, CharField
from comments.models import Comments, LikeDislike

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

def run():
    query()
