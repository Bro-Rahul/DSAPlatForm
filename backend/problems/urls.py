from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import problem_view,tag_view
from .views.general.problem_view import ProblemGeneralView
from .routes.admin import adminRoute

""" router = DefaultRouter()

router.register("",problem_view.ProblemView,basename="problems")
router.register("tags",tag_view.TagView,basename="problems-tags")

router.register("list/get",ProblemGeneralView,basename="lists-problems") """

urlpatterns = [
    path("",include(adminRoute.urls)),
]
