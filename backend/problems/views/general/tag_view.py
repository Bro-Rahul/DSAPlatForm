from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
from django.db.models import Q

from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from ...serializers.tag_serilaizer import TagSerializer
from ...serializers.problem_serializer import ProblemListSerializer
from ...models import Tags,Problems

class TagView(ViewSet):
    model = Tags
    serializer = TagSerializer

    def get_queryset(self):
        return Tags.objects.all()
    

    @method_decorator(cache_page(60*60*2,key_prefix="tags"))
    def list(self,request):
        tags = self.model.objects.all()
        serializer = self.serializer(tags,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

    @action(detail=False,methods=["GET",],url_path="filter-by")
    def problem_by_tags_and_levels(self,request):
        tags = request.query_params.getlist('tag')
        level = request.query_params.get('level',None)
        if level:
            problems = Problems.objects.prefetch_related('tags').filter(
                Q(tags__tag__in=tags) |
                Q(level = level[0])
            )
            serializer = ProblemListSerializer(problems,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            problems = Problems.objects.prefetch_related('tags').filter(tags__tag__in=tags)
            serializer = ProblemListSerializer(problems,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        
