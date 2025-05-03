from rest_framework import permissions
from users.models import Users

class IsStaffUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_staff 