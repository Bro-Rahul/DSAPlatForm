from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status

from django.shortcuts import get_object_or_404
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator

from problems.models import Problems
from problems.serializers.general.problemSerializer import ProblemListSerializer


class ProblemView(ViewSet):
    model = Problems
    lookup_field = 'slug'

    def get_permissions(self):
        if self.action in ["get_user_submissions",]:
            pass
        return super().get_permissions()

    def get_queryset(self):
        return Problems.objects.prefetch_related("tags")
    

    @method_decorator(cache_page(60*60*2,key_prefix="problems"))
    def list(self,request):
        serializer = ProblemListSerializer(self.get_queryset(),fields = ['title','level','slug','tags',"hints","id"],many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

    @method_decorator(cache_page(60*60*2))
    def retrieve(self, request, slug=None):
        queryset = Problems.objects.prefetch_related("tags",)
        data = get_object_or_404(queryset,slug=slug)
        serializer  = ProblemListSerializer(
            data,
            fields = ['tags','id','difficulty','hints','description','title','testcases','starter_codes']
        )
        return Response(serializer.data,status=status.HTTP_200_OK)

    @action(methods=["GET",],detail=True,url_path="description")
    def get_problem_description(self,request,slug=None):
        queryset = Problems.objects.prefetch_related("tags",)
        data = get_object_or_404(queryset,slug=slug)
        serializer  = ProblemListSerializer(
            data,
            fields = ['tags','id','difficulty','hints','description','title','slug']
        )
        return Response(serializer.data,status=status.HTTP_200_OK)
    

    @action(methods=["GET",],detail=True,url_path="editors-codes")
    def get_user_submissions(self,request,slug=None):
        data = get_object_or_404(Problems,slug=slug)
        serializer  = ProblemListSerializer(
            data,
            fields = ['starter_codes',"testcases"],
        )
        return Response(serializer.data,status=status.HTTP_200_OK)
    

    @action(methods=["GET",],detail=True,url_path="solutions")
    def get_problem_solutions(self,request,slug=None):
        queryset = Problems.objects.prefetch_related("tags",)
        data = get_object_or_404(queryset,slug=slug)
        serializer  = ProblemListSerializer(
            data,
            fields = ['starter_codes',"testcases"]
        )
        return Response(serializer.data,status=status.HTTP_200_OK)