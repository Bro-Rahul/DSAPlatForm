from rest_framework.response import Response
from rest_framework.views import APIView
from .validators.UploadImage import UploadImageValidator
from django.conf import settings
from uuid import uuid4
import os 

class UploadImageView(APIView):

    def post(self,request):
        validate_result = UploadImageValidator(data=request.data)
        if validate_result.is_valid():
            file = validate_result.validated_data.get('image')
            filename,ext = file.name.split(".")
            
            unique_name = f"{uuid4().hex}.{ext}"
            save_path = os.path.join(f"{settings.MEDIA_ROOT}/solutions",unique_name)
            relative_path = f"/solutions/{unique_name}"
            
            with open(save_path, 'wb+') as destination:
                for chunk in file.chunks():
                    destination.write(chunk)
            return Response({
                'path' : relative_path,
            })
        return Response(validate_result.errors)