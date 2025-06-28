from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views.comment_view import CommentView,ProblemAndCommentView,get_problem_comment,get_comment_subcomments

router = DefaultRouter()

router.register("comments",CommentView,basename="comment-view")
#router.register("problem",ProblemAndCommentView,basename="problem-view")

urlpatterns = [
    path("",include(router.urls)),
    path("problem/<slug:slug>/comments",get_problem_comment,name="get-problem-comment"),
    path("problem/<slug:slug>/comments/<int:pk>/subcomments/",get_comment_subcomments,name="get-comment-subcomment")
]