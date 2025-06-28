from rest_framework import viewsets,status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action

from django.shortcuts import get_object_or_404
from django.http import Http404
from django.db.models import Q

from ..permissions.VoteOwner import VoteOwner
from ..models import Comments,LikeDislike


class VotingView(viewsets.ViewSet):

    def get_permissions(self):
        if self.action in ["vote_comment_like","vote_comment_dislike"]:
            self.permission_classes = [IsAuthenticated,]
        return super().get_permissions()


    @action(methods=["POST",],detail=True,url_path="like")
    def vote_comment_like(self,request,pk=None):
        try:
            obj = get_object_or_404(Comments,pk=pk)
        except Http404 as e:
            return Response({'info':"No Such Comment Exists!"},status=status.HTTP_400_BAD_REQUEST)
        
        vote = LikeDislike.objects.filter(comment=obj,user=request.user).first() 
        if not vote:
            LikeDislike.objects.create(user=request.user,comment=obj,isLiked=True)
            return Response({'info':'votting has been recorded'},status=status.HTTP_200_OK)
        if vote.isLiked == False:
            vote.isLiked = True
            vote.save()
            return Response({'info':'votting has been recorded'},status=status.HTTP_200_OK)
        vote.delete()
        return Response({'info':'votting has been recorded'},status=status.HTTP_200_OK)
        
    @action(methods=["POST",],detail=True,url_path="dislike")
    def vote_comment_dislike(self,request,pk=None):
        try:
            obj = get_object_or_404(Comments,pk=pk)
        except Http404 as e:
            return Response({'info':"No Such Comment Exists!"},status=status.HTTP_400_BAD_REQUEST)
        vote = LikeDislike.objects.filter(comment=obj,user=request.user).first() 
        if not vote:
            LikeDislike.objects.create(user=request.user,comment=obj,isLiked=False)
            return Response({'info':'votting has been recorded'},status=status.HTTP_200_OK)
        if vote.isLiked == True:
            vote.isLiked = False
            vote.save()
            return Response({'info':'votting has been recorded'},status=status.HTTP_200_OK)
        vote.delete()
        return Response({'info':'votting has been recorded'},status=status.HTTP_200_OK)