from rest_framework import serializers
from ..models import Comments
from problems.models import Problems
from users.models import Users

class CommentSerializer(serializers.ModelSerializer):
    problem = serializers.PrimaryKeyRelatedField(queryset=Problems.objects.all())

    class Meta:
        model = Comments
        fields = "__all__"