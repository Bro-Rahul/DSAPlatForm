from rest_framework import serializers

class SocialLoginValidator(serializers.Serializer):
    email = serializers.EmailField()
    username = serializers.CharField()
    providers = serializers.CharField()
