from rest_framework import serializers
from ..utils.DynamicModelFieldSerializer import DynamicFieldsModelSerializer
from problems.models import Problems

class ProblemListSerializer(DynamicFieldsModelSerializer):

    tags = serializers.StringRelatedField(many=True)
    difficulty = serializers.SerializerMethodField()
    level = serializers.SerializerMethodField()

    class Meta:
        model = Problems
        fields = '__all__'
    
    def get_difficulty(self,obj):
        return obj.get_level_display()

    def get_level(self,obj):
        return obj.get_level_display()

    def to_representation(self, instance:Problems):
        obj = super().to_representation(instance)
        testcase = obj.get('testcases',None)
        if testcase:
            testcases = ""
            test1,test2 = instance.testcases.split("\n")[:2]
            testcases = f"{test1}\n{test2}"
            obj['testcases'] = testcases
            return obj 
        return obj