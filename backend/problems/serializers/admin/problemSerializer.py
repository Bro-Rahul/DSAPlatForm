from rest_framework import serializers
from problems.models import Problems
from django.db import transaction
from problems.models import Problems,Tags
from users.models import Users
from django.utils.text import slugify
from ..utils.DynamicModelFieldSerializer import DynamicFieldsModelSerializer

class ProblemListSerializer(DynamicFieldsModelSerializer):

    tags = serializers.StringRelatedField(many=True)
    difficulty = serializers.SerializerMethodField()

    class Meta:
        model = Problems
        fields = '__all__'
    
    def get_difficulty(self,obj):
        return obj.get_level_display()


class ProblemCreateUpdateSerializer(serializers.ModelSerializer):
    tags = serializers.ListField(
        child=serializers.CharField(min_length=3,max_length=30),
        write_only=True
    )
    level = serializers.CharField(
        write_only=True
    )
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
            problem = Problems.objects.create(level=level,**validated_data)
            taglist = []
            for tag in tags:
                tag_obj, _ = Tags.objects.get_or_create(tag=tag)
                taglist.append(tag_obj)
            problem.tags.set(taglist) 
        return problem
    

    def update(self, instance, validated_data):
        tags = validated_data.pop("tags", None)
        level = validated_data.pop("level", None)

        with transaction.atomic():
            if level:
                instance.level = level[0]

            if 'title' in validated_data:
                instance.slug = slugify(validated_data['title'])

            if tags is not None:
                taglist = []
                for tag in tags:
                    tag_obj, _ = Tags.objects.get_or_create(tag=tag)
                    taglist.append(tag_obj)
                instance.tags.set(taglist)

            return super().update(instance, validated_data)
