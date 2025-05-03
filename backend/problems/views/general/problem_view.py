from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.shortcuts import get_object_or_404
from problems.serializers.problem_serializer import ProblemListSerializer
from problems.models import Problems

class ProblemGeneralView(ViewSet):

    def list(self,request):
        serializer = ProblemListSerializer(
            Problems.objects.prefetch_related("tags"),
            many=True
        )
        return Response(serializer.data)
    
