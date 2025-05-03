from django.urls import path,include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenVerifyView
from .views import views
from .views import jwtAuth

router = DefaultRouter()

router.register("",views.UserView,basename="user-related")
router.register("auth/login-with",jwtAuth.LoginWithSocialAccounts,basename='social-login')

urlpatterns = [
    path("",include(router.urls)),
    path("auth/login",jwtAuth.CustomTokenObtainPairView.as_view(),name="jwt-login"),
]
