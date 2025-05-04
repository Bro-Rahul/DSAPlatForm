from rest_framework import serializers
from ..utils.DynamicModelFieldSerializer import DynamicFieldsModelSerializer
from problems.models import Problems

class ProblemListSerializer(DynamicFieldsModelSerializer):

    tags = serializers.StringRelatedField(many=True)
    difficulty = serializers.SerializerMethodField()

    class Meta:
        model = Problems
        fields = '__all__'
    
    def get_difficulty(self,obj):
        return obj.get_level_display()