from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views.comment_view import CommentView,get_problem_comment,get_comment_subcomments
from .views.votes_view import VotingView

router = DefaultRouter()

router.register("comments",CommentView,basename="comment-view")
router.register("comment/vote",VotingView,basename="comment-voting")

urlpatterns = [
    path("",include(router.urls)),
    path("problem/<slug:slug>/comments",get_problem_comment,name="get-problem-comment"),
    path("problem/<slug:slug>/comments/<int:pk>/subcomments/",get_comment_subcomments,name="get-comment-subcomment")
]