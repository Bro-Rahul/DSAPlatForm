from rest_framework.permissions import BasePermission
from ..models import Comments
class CommentOwner(BasePermission):
    def has_object_permission(self, request, view, obj:Comments):
        return request.user.pk == obj.user.pk