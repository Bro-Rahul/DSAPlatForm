from django.urls import path,include
from .routes.admin_routes import adminRoute
from .routes.general_routes import generalRoute


urlpatterns = [
    path("",include(adminRoute.urls)),
    path("",include(generalRoute.urls)),
]
