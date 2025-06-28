from rest_framework import serializers
from ..models import Comments,LikeDislike
from problems.models import Problems
from django.db.models import Q,Count

class CommentSerializer(serializers.ModelSerializer):
    problem = serializers.PrimaryKeyRelatedField(queryset=Problems.objects.all())
    likes = serializers.IntegerField(read_only=True)
    dislikes = serializers.IntegerField(read_only=True)
    user_vote = serializers.SerializerMethodField()

    class Meta:
        model = Comments
        fields = ['id','user','comment','problem','comment_type','subcomment_id','created_at',"likes","dislikes","user_vote"]


    def get_user_vote(self,obj):
        user_id = self.context.get("user_id",None)
        if not user_id: 
            return None
        result = LikeDislike.objects.filter(user=user_id).first()
        if result:
            return result.isLiked
        return None