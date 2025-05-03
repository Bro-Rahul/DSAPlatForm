from rest_framework import serializers
from ..models import Problems

class ProblemSerializer(serializers.ModelSerializer):
    tags = serializers.StringRelatedField(many=True)
    difficulty = serializers.SerializerMethodField()
    class Meta:
        model = Problems
        exclude = ['level','solution_codes']
    
    def get_difficulty(self,obj):
        return obj.get_level_display()
    
        
class ProblemListSerializer(serializers.ModelSerializer):
    tags = serializers.StringRelatedField(many=True)
    level = serializers.SerializerMethodField()
    class Meta:
        model = Problems
        fields = ['title','level','tags','slug']

    def get_level(self,obj):
        return obj.get_level_display()

class ProblemAllFieldsSerializer(serializers.ModelSerializer):
    tags = serializers.StringRelatedField(many=True)
    difficulty = serializers.SerializerMethodField()

    class Meta:
        model = Problems
        exclude = ['user','level']

    def get_difficulty(self,obj):
        return obj.get_level_display()