from rest_framework import viewsets,status
from rest_framework.response import Response
from rest_framework.decorators import action

from django.shortcuts import get_object_or_404

from problems.models import Problems
from problems.serializers.admin.problemSerializer import ProblemListSerializer

class ProblemTestCaseView(viewsets.ViewSet):
    model = Problems
    lookup_field = 'slug'

    def get_queryset(self):
        return Problems.objects.prefetch_related('tags')
    
    
    @action(detail=True,methods=["POST",],url_path="add-testcase")
    def add_new_testcases(self,request,slug=None):
        obj = get_object_or_404(Problems,slug=slug)
        serializer = ProblemListSerializer(obj)
        return Response({'info':serializer.data})