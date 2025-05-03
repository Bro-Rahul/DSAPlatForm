from rest_framework import viewsets,status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from problems.models import Problems
from problems.serializers.admin.problemSerializer import ProblemListSerializer,ProblemCreateUpdateSerializer
from problems.permissions.admin.index import IsStaffUser,IsProblemCreator
from rest_framework.permissions import IsAuthenticated
from problems.constants import formateErrorMessage

class ProblemView(viewsets.ViewSet):
    model = Problems
    lookup_field = 'slug'
    queryset = Problems.objects.prefetch_related('tags')
    

    def get_permissions(self):
        if self.action in ['list','create_problem']:
            self.permission_classes = [IsAuthenticated,IsStaffUser]
        elif self.action in ['update_problem','delete_problem']:
            self.permission_classes = [IsAuthenticated,IsStaffUser,IsProblemCreator]
        return super().get_permissions()
    
    def list(self,request):
        data = self.model.objects\
            .prefetch_related("tags")\
            .filter(user=request.user.id)
        serializer = ProblemListSerializer(
            data,
            many=True,
            fields=['tags','id','difficulty','title','slug']
        )
        return Response(serializer.data,status=status.HTTP_200_OK)

    def retrieve(self, request, slug=None):
        queryset = Problems.objects.prefetch_related("tags",)
        data = get_object_or_404(queryset,slug=slug)
        serializer  = ProblemListSerializer(
            data,
            fields = ['tags','id','difficulty','title','testcases','starter_codes','solution_codes']
        )
        return Response(serializer.data) 


    @action(methods=['POST',],detail=False,url_path="create")
    def create_problem(self,request):
        serializer = ProblemCreateUpdateSerializer(data=request.data)
        try:
            if serializer.is_valid():
                serializer.save()
                return Response({'info':"Problem Created successfully!"},status=status.HTTP_200_OK)
            else:
                return Response({'info':formateErrorMessage(serializer.errors)},status=status.HTTP_400_BAD_REQUEST)
        except Exception as e: 
            print(e)
            return Response({'info':str(e)})

    @action(detail=True,methods=['PATCH',],url_path='update')
    def update_problem(self, request, slug=None):
        obj = get_object_or_404(self.queryset,slug=slug) 
        self.check_object_permissions(request,obj)
        serializer = ProblemCreateUpdateSerializer(
            instance = obj,
            data=request.data,
            partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response({'info':formateErrorMessage(serializer.errors)},status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True,methods=['DELETE',],url_path='delete')
    def delete_problem(self, request, slug=None):
        obj = get_object_or_404(self.queryset,slug=slug) 
        self.check_object_permissions(request,obj)
        obj.delete()
        return Response({'info':'Delete Success'})