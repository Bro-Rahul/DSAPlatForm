from rest_framework import serializers
from ..models import Solutions
from users.models import Users
from problems.models import Problems,Tags
from django.db import transaction


class SolutionSerializer(serializers.ModelSerializer):
    solution_tags = serializers.ListField(
        child=serializers.CharField(min_length=1,max_length=50),
        allow_empty = False,
        min_length = 1,
        write_only=True
    )

    problem = serializers.PrimaryKeyRelatedField(queryset=Problems.objects.all())
    user = serializers.PrimaryKeyRelatedField(queryset=Users.objects.all())
    tags = serializers.StringRelatedField(many=True,read_only=True)

    class Meta:
        model = Solutions
        fields = '__all__'

    def create(self, validated_data):
        tags = validated_data.pop('solution_tags',[])
        with transaction.atomic():
            solution = Solutions.objects.create(**validated_data)
            tag_list = []
            for item in tags:
                tag_obj,_ = Tags.objects.get_or_create(tag=item)
                tag_list.append(tag_obj)
            solution.tags.set(tag_list)
        return solution