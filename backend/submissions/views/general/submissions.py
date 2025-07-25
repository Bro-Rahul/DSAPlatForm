from submissions.models import Submissions
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets,status
from rest_framework.permissions import IsAuthenticated

from submissions.serializers.SubmissionSerializer import SubmissionSerializer

from django.db.models import F
from django.shortcuts import get_object_or_404
from django.http import Http404

class SubmissionsViewSet(viewsets.ViewSet):
    lookup_field = 'slug'
    
    def get_permissions(self):
        if self.action in ['get_submission_for_problem',]:
            self.permission_classes = [IsAuthenticated,]
        return super().get_permissions()
    
    def retrieve(self, request, slug=None):
        try:
            submission_id = int(slug)
        except (TypeError, ValueError):
            return Response(
                {'error': 'Invalid submission ID. Must be an integer.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            submission = get_object_or_404(Submissions, pk=submission_id)
        except Http404:
            return Response(
                {'error': 'No such submission exists!'},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = SubmissionSerializer(submission)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=["GET",],detail=True,url_path="user-submissions")
    def get_submission_for_problem(self, request, slug=None):
        submissions = Submissions.objects\
            .filter(problem__slug=slug,user__id=request.user.id)\
            .order_by(F('created_at').desc())
        serializer = SubmissionSerializer(submissions,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)