from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets,status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated

from .models import Solutions
from .validators.UploadImage import UploadImageValidator
from .serializer.solutionSerializer import SolutionSerializer

from django.conf import settings
from django.shortcuts import get_object_or_404
from django.db.models import Count,F
from django.db.models.functions import Lower

from uuid import uuid4
import os 

class UploadImageView(APIView):

    def post(self,request):
        validate_result = UploadImageValidator(data=request.data)
        if validate_result.is_valid():
            file = validate_result.validated_data.get('image')
            filename,ext = file.name.split(".")
            
            unique_name = f"{uuid4().hex}.{ext}"
            save_path = os.path.join(f"{settings.MEDIA_ROOT}/solutions",unique_name)
            relative_path = f"/solutions/{unique_name}"
            
            with open(save_path, 'wb+') as destination:
                for chunk in file.chunks():
                    destination.write(chunk)
            return Response({
                'path' : relative_path,
            })
        return Response(validate_result.errors)
    
class SolutionsView(viewsets.ViewSet):
    model = Solutions

    lookup_field = 'slug'
    
    def get_permissions(self):
        if self.request.method == "POST":
            self.permission_classes = [IsAuthenticated,]
        return super().get_permissions()

    def retrieve(self, request, slug=None):
        try:
            pk = int(slug)
            obj = get_object_or_404(Solutions,pk=pk)
            serializer = SolutionSerializer(obj)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except ValueError:
            return Response(f"{slug} is a non-numeric string")

    @action(methods=["POST",],detail=False,url_path="create")
    def create_solution(self,request):
        serializer = SolutionSerializer(data={
            **request.data,
            "user": request.user.pk
        })
        if serializer.is_valid():
            serializer.save()
            return Response({'info':'success'},status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST) 

    
    @action(methods=["GET",],detail=True,url_path="get-solutions")
    def problem_solutions(self,request,slug=None):
        solutions = Solutions.objects\
                        .prefetch_related("tags")\
                        .filter(problem__slug=slug)

        serializer = SolutionSerializer(solutions,many=True)

        return Response(serializer.data,status=status.HTTP_200_OK)


    @action(methods=["GET",],detail=True,url_path="available-solutions-tags")
    def get_available_tags_for_solutions(self,request,slug=None):
        lang_count = Solutions.objects\
                        .filter(problem__slug=slug)\
                        .values("tags__tag")\
                        .annotate(
                            count = Count("pk"),
                            tag = F("tags__tag")
                        )\
                        .values("tag","count")
        return Response({
            "tags": lang_count,
        },status=status.HTTP_200_OK)

    @action(methods=["GET",], detail=True, url_path="filter-by")
    def problem_solution_filter(self, request, slug=None):
        tag_list = request.query_params.getlist("tags",None)

        if not tag_list:
            solutions = Solutions.objects\
                    .filter(
                        problem__slug=slug,
                    ).distinct()
        else:
            solutions = Solutions.objects\
                    .annotate(
                        tag_lower=Lower("tags__tag")
                    ).filter(
                        problem__slug=slug,
                        tag_lower__in=tag_list
                    ).distinct()

        serializer = SolutionSerializer(solutions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)