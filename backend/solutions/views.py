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
from django.db.models import Count,Q
from django.http import Http404

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
    
    def get_permissions(self):
        if self.request.method == "POST":
            self.permission_classes = [IsAuthenticated,]
        return super().get_permissions()

    def create(self,request):

        return Response("create a new Solution",status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        try:
            obj = get_object_or_404(self.model,pk=pk)
        except Http404 as e:
            return Response({'info':'No such solution exists '},status=status.HTTP_400_BAD_REQUEST)
        serializer = SolutionSerializer(obj)
        return Response(serializer.data,status=status.HTTP_200_OK)


    @action(methods=["GET",],detail=False,url_path="filter-by")
    def solution_filter_by(self,request):
        tags = request.query_params.getlist('tag')
        solutions = Solutions.objects.filter(
            tags__tag__in = tags
        )
        serializer = SolutionSerializer(solutions,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

    # this endpoint will return the all the tags that has been submitted 
    # for this problem only by all users 
    @action(methods=["GET",],detail=True,url_path="get-alltags")
    def solution_filter_by(self,request,pk=None):
        tags = Solutions.objects.filter(problem__slug=pk).values("tags").annotate(
            total_sol = Count("pk")
        )
        serializer = SolutionSerializer(tags,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)