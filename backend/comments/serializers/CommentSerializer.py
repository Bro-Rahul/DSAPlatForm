from rest_framework import serializers
from ..models import Comments,LikeDislike
from problems.models import Problems

class CommentSerializer(serializers.ModelSerializer):
    problem = serializers.PrimaryKeyRelatedField(queryset=Problems.objects.all())
    likes = serializers.IntegerField(read_only=True)
    dislikes = serializers.IntegerField(read_only=True)
    user_vote = serializers.StringRelatedField()
    username = serializers.StringRelatedField(source='user')
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = Comments
        fields = ['id','user','comment','problem','comment_type','subcomment_id','created_at',"likes","dislikes","user_vote",'username','avatar','user_vote']


    
    def get_avatar(self,obj):
        return obj.user.avatar