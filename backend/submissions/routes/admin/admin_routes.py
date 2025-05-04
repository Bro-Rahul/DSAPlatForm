from rest_framework.routers import DefaultRouter
from ...views.admin.verify_testcase_view import ProblemTestCaseView
adminRoutes = DefaultRouter()

adminRoutes.register("admin/submissions",ProblemTestCaseView,basename='testcases-related-view')
