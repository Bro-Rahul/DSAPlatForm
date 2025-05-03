from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from users.serializers.UserSerializer import LoginUserSerializer
from rest_framework import status


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        userserializer = LoginUserSerializer(user)
        return Response({
            'token': token.key,
            **userserializer.data
        },status=status.HTTP_200_OK)
    
    def delete(self,request,pk):
        try:
            Token.objects.get(key=pk).delete()
            return Response({"info":"Logout success "},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"info":"Can' logout the user or no user is logged in currently"},status=status.HTTP_200_OK)