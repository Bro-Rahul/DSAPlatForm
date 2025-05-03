from rest_framework import serializers
from users.models import Users


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['username','email','first_name','last_name','avatar','id',]

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['username','email','password']

class LoginUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id','username','email','first_name','last_name','avatar']