from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.shortcuts import get_object_or_404
from ..serializers.problem_serializer import ProblemSerializer,ProblemListSerializer,ProblemAllFieldsSerializer
from ..serializers.validators import ProblemCreateSerializer
from ..models import Problems

class ProblemView(ViewSet):

    def get_permissions(self):
        if self.action in ['list','problem_create']:
            self.permission_classes = [ IsAuthenticated]
        return super().get_permissions()


    def list(self,request):
        try:
            self.check_permissions(request)
        except PermissionError as e:
            return Response({'info':"You don't have the permission to perform this actions!" },)
        serializer = ProblemListSerializer(
            Problems.objects.prefetch_related("tags").filter(user=request.user.id),
            many=True
        )
        return Response(serializer.data)
    
    
    def retrieve(self, request, pk=None):
        queryset = Problems.objects.prefetch_related("tags",)
        user = get_object_or_404(queryset,slug=pk)
        serializer = ProblemAllFieldsSerializer(user)
        return Response(serializer.data)

    @action(methods=["POST",],detail=False,url_path="create")
    def problem_create(self,request):
        try:
            self.check_permissions(request)
        except PermissionError as e:
            return Response({'info':"You don't have the permission to perform this actions!" },)
        serializer = ProblemCreateSerializer(data=request.data)
        try:
            if serializer.is_valid():
                serializer.save()
                return Response({'info':"Problem Created successfully!"},status=status.HTTP_200_OK)
            else:
                return Response({'info':serializer.errors},status=status.HTTP_400_BAD_REQUEST)
        except Exception as e: 
            print(e)
            return Response({'info':str(e)})
        
    @action(methods=["GET",],detail=False,url_path="solve")
    def get_problem(self,request):
        slug = request.query_params['slug']
        problem = get_object_or_404(Problems,slug=slug)
        serializer = ProblemSerializer(problem)
        return Response(serializer.data)