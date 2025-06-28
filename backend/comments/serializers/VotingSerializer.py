from rest_framework import serializers
from users.models import Users
from problems.models import Problems

from ..models import LikeDislike

class VotingSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=Users.objects.all())
    problem = serializers.PrimaryKeyRelatedField(queryset=Problems.objects.all())

    class Meta:
        model = LikeDislike
        fields = '__all__'
