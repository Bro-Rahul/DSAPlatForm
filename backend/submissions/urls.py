from django.urls import include,path
from .routes.general.general_routes import generalRoutes

urlpatterns = [
    path("",include(generalRoutes.urls))
]
