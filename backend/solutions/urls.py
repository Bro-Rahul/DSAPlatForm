from django.urls import path
from .views import UploadImageView

urlpatterns = [
    path("upload-image/solutions/",UploadImageView.as_view(),name='solution-upload')        
]
