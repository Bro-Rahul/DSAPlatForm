from rest_framework import serializers
from ..models import Problems,Tags
from django.db import transaction
from users.models import Users

class ProblemCreateSerializer(serializers.ModelSerializer):
    tags = serializers.ListField(
        child=serializers.CharField(min_length=3,max_length=30),
        write_only=True
    )
    level = serializers.CharField(write_only=True)
    difficulty = serializers.CharField(read_only=True)
    user = serializers.PrimaryKeyRelatedField(
        queryset=Users.objects.filter(is_staff=True)
    )

    class Meta:
        model = Problems
        fields = '__all__'


    def create(self, validated_data):
        tags = validated_data.pop("tags", [])
        with transaction.atomic():
            level = validated_data.pop("level")[0]
            problem = Problems.objects.create(level=level,**validated_data)  # Assign user
            taglist = []
            for tag in tags:
                tag_obj, _ = Tags.objects.get_or_create(tag=tag)
                taglist.append(tag_obj)
            problem.tags.set(taglist) 
        return problem

    