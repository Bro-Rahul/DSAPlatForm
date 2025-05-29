from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets
from rest_framework import status

from django.contrib.auth.hashers import make_password,check_password
from ..models import Users
from ..validators.userValidator import SocialLoginValidator

def create_token(user:Users):
    refresh = RefreshToken.for_user(user)
    data = {
        'id' : user.pk,
        'username': user.username,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'image': user.avatar,
        'isAdmin' : user.is_staff,
        'access': str(refresh.access_token),
    }
    return data

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.user
            response_data = {
                'id' : user.pk,
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'isAdmin' : user.is_staff,
                'access': serializer.validated_data['access'],
            }
            return Response(response_data, status=status.HTTP_200_OK)
        else:
            return Response({'info':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class LoginWithSocialAccounts(viewsets.ViewSet):
    
    @action(methods=['POST',],detail=False,url_path='google')
    def google_login(self,request):

        serializer = SocialLoginValidator(data=request.data)
        if not serializer.is_valid():
            return Response({'detail':serializer.errors},status=status.HTTP_403_FORBIDDEN)

        user, created = Users.objects.get_or_create(
            email=serializer.validated_data.get("email"),
        )
        if created:
            user.avatar = serializer.validated_data.get('image')
            user.set_password(serializer.validated_data.get('password')) 
            user.providers = Users.Providers.GOOGLE
            user.save()
            data = create_token(user=user)
            return Response(data,status=status.HTTP_200_OK)
        
        elif check_password(serializer.validated_data.get('password'),user.password) and user.providers == Users.Providers.GOOGLE:
            data = create_token(user=user)
            return Response(data,status=status.HTTP_200_OK)
        else:
            return Response({
                'info':'Account already exists please try with another credencials !'},
                status=status.HTTP_400_BAD_REQUEST
                )
            
        


    @action(methods=['POST',],detail=False,url_path='github')
    def login_with_github(self,request):

        serializer = SocialLoginValidator(data=request.data)
        if not serializer.is_valid():
            return Response({'detail':serializer.errors},status=status.HTTP_403_FORBIDDEN)

        user, created = Users.objects.get_or_create(
            email=serializer.validated_data.get("email"),
        )
        if created:
            user.avatar = serializer.validated_data.get('image')
            user.set_password(serializer.validated_data.get('password')) 
            user.providers = Users.Providers.GITHUB
            user.save()
            data = create_token(user=user)
            return Response(data,status=status.HTTP_200_OK)
        
        elif check_password(serializer.validated_data.get('password'),user.password) and user.providers == Users.Providers.GITHUB:
            data = create_token(user=user)
            return Response(data,status=status.HTTP_200_OK)
        else:
            return Response({
                'info':'Account already exists please try with another credencials !'},
                status=status.HTTP_400_BAD_REQUEST
                )