from submissions.models import Submissions
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets,status
from rest_framework.permissions import IsAuthenticated

from submissions.serializers.SubmissionSerializer import SubmissionSerializer

from django.db.models import F

class SubmissionsViewSet(viewsets.ViewSet):
    lookup_field = 'slug'
    permission_classes = []
    
    def get_permissions(self):
        if self.action in ['retrieve',]:
            self.permission_classes = [IsAuthenticated,]
        return super().get_permissions()
    

    def retrieve(self, request, slug=None):
        submissions = Submissions.objects\
            .defer('user','problem')\
            .filter(problem__slug=slug,user__id=request.user.id)\
            .values('id','submission_code','submission_lang','status','created_at',"details")\
            .order_by(F('created_at').desc())
        serializer = SubmissionSerializer(submissions,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)