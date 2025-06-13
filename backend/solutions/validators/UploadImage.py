from rest_framework import serializers

class UploadImageValidator(serializers.Serializer):
    image = serializers.ImageField()