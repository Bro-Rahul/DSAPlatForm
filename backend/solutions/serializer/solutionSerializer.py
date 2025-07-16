from rest_framework import serializers
from ..models import Solutions


class SolutionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Solutions
        fields = '__all__'