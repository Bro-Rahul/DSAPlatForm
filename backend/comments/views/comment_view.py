from rest_framework import viewsets,status,permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.decorators import api_view

from ..serializers.CommentSerializer import CommentSerializer
from ..models import Comments
from problems.models import Problems
from ..permissions.CommentOwner import CommentOwner

from django.shortcuts import get_object_or_404
from django.http import Http404
from django.db.models import Q


class CommentView(viewsets.ViewSet):

    def get_permissions(self):
        if self.action in ["create","create_subcomment"]:
            self.permission_classes = [permissions.IsAuthenticated,]
        elif self.action in ["destroy","partial_update"]:
            self.permission_classes = [permissions.IsAuthenticated,CommentOwner,]
        return super().get_permissions()
    
    def list(self,request):
        data = Comments.objects.all()
        serializer = CommentSerializer(data,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

    def create(self,request):
        serializer = CommentSerializer(data={
            "problem" : request.data.get('problem'),
            "comment" : request.data.get("comment"),
            "user": request.user.pk
        })
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    
    def destroy(self, request, pk=None):
        try:
            obj = get_object_or_404(Comments,pk=pk)
            self.check_object_permissions(request=request,obj=obj)
        except Http404 as e:
            return Response({'info':"No Such Comment Exists!"},status=status.HTTP_400_BAD_REQUEST)

        obj.delete()
        return Response({'info':"success"},status=status.HTTP_200_OK)

    def partial_update(self, request, pk=None):
        try:
            obj = get_object_or_404(Comments,pk=pk)
            self.check_object_permissions(request=request,obj=obj)
        except Http404 as e:
            return Response({'info':"No Such Comment Exists!"},status=status.HTTP_400_BAD_REQUEST)

        serializer = CommentSerializer(
            instance = obj,
            data=request.data,
            partial = True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    

    @action(methods=["POST",],detail=True,url_path="subcomment")
    def create_subcomment(self,request,pk=None):
        try:
            obj = get_object_or_404(Comments,pk=pk)
        except Http404 as e:
            return Response({'info':'No such comment is found'},status=status.HTTP_400_BAD_REQUEST)
        serializer = CommentSerializer(data={
            "comment" : request.data.get('comment'),
            "problem" : obj.problem.pk,
            "subcomment_id" : obj.pk,
            "user" : request.user.pk
        })
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        

class ProblemAndCommentView(viewsets.ViewSet):

    @action(methods=["GET"],detail=True,url_path="comments")
    def get_problem_comment(self,request,pk=None):
        try:
            obj = get_object_or_404(Problems,slug=pk)
        except Http404 as e:
            return Response({'info':"No Such Problem Exists!"},status=status.HTTP_400_BAD_REQUEST)
        comments = CommentSerializer(Comments.objects.filter(Q(problem=obj) & Q(subcomment_id=None)),many=True)
        return Response(comments.data,status=status.HTTP_200_OK)

@api_view(['GET'])
def get_problem_comment(request, slug=None):
    print("Hi there")
    try:
        obj = get_object_or_404(Problems, slug=slug)
    except Http404:
        return Response({'info': "No Such Problem Exists!"}, status=status.HTTP_400_BAD_REQUEST)

    comments = CommentSerializer(
        Comments.objects.filter(Q(problem=obj) & Q(subcomment_id=None)),
        many=True
    )
    return Response(comments.data, status=status.HTTP_200_OK)



@api_view(['GET'])
def get_comment_subcomments(request, slug=None,pk=None):
    try:
        problem = get_object_or_404(Problems, slug=slug)
        comment = get_object_or_404(Comments,pk=pk)
    except Http404:
        return Response({'info': "No Such Problem Or Comment Exists!"}, status=status.HTTP_400_BAD_REQUEST)

    comments = CommentSerializer(
        Comments.objects.filter(Q(problem=problem) & Q(subcomment_id=comment)),
        many=True
    )
    return Response(comments.data, status=status.HTTP_200_OK)