from rest_framework import permissions


class IsStaffUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_staff 


class IsProblemCreator(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.id == obj.user.id