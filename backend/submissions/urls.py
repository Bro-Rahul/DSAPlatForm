from django.urls import include,path
from .routes.admin.admin_routes import adminRoutes

urlpatterns = [
    path("",include(adminRoutes.urls))
]
