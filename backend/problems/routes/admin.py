from django.urls import path,include
from rest_framework.routers import DefaultRouter
from ..views.admin.problems_view import ProblemView

adminRoute = DefaultRouter()

adminRoute.register('admin/problems',ProblemView,basename='admin-problem-view')
