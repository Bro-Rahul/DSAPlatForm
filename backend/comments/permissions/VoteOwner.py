from rest_framework.permissions import BasePermission
from ..models import LikeDislike

class VoteOwner(BasePermission):

    def has_object_permission(self, request, view, obj:LikeDislike):
        return request.user.pk == obj.user.pk