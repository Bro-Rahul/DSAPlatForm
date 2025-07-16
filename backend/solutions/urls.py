from django.urls import path,include
from .views import UploadImageView,SolutionsView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register("general/solution",SolutionsView,basename="solution-view")

urlpatterns = [
    path("upload-image/solutions/",UploadImageView.as_view(),name='solution-upload'),
    path("",include(router.urls))
]
