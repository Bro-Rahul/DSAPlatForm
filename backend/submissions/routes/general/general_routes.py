from rest_framework.routers import DefaultRouter
from ...views.general.general_view import SubmissionsView
from ...views.general.submissions import SubmissionsViewSet

generalRoutes = DefaultRouter()

generalRoutes.register("general/submissions",SubmissionsView,basename='Submissions-view')
generalRoutes.register("general/submissions-results",SubmissionsViewSet,basename='submission-results-view')