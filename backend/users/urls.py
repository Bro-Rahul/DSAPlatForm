from django.urls import path,include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenVerifyView
from .views import views
from .views import jwtAuth

router = DefaultRouter()

router.register("users",views.UserView,basename="user-related")
router.register("users/auth/login-with",jwtAuth.LoginWithSocialAccounts,basename='social-login')

urlpatterns = [
    path("",include(router.urls)),
    path("users/auth/login",jwtAuth.CustomTokenObtainPairView.as_view(),name="jwt-login"),
]