from rest_framework.routers import DefaultRouter
from ...views.general.general_view import SubmissionsView

generalRoutes = DefaultRouter()

generalRoutes.register("general/submissions",SubmissionsView,basename='Submissions-view')