from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from ..serializers.tag_serilaizer import TagSerializer

from ..models import Tags

class TagView(ViewSet):
    model = Tags
    serializer = TagSerializer

    
    def list(self,request):
        tags = self.model.objects.all()
        serializer = self.serializer(tags,many=True)
        return Response(serializer.data,)