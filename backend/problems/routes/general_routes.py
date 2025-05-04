from rest_framework.routers import DefaultRouter
from problems.views.general.problem_view import ProblemView
from problems.views.general.tag_view import TagView

generalRoute = DefaultRouter()

generalRoute.register('general/problems',ProblemView,basename='general-problem-view')
generalRoute.register('general/tags',TagView,basename='general-tags-view')