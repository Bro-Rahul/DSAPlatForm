from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets
from rest_framework import status
from ..models import Users
from ..validators.userValidator import SocialLoginValidator

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

        if serializer.is_valid():
            user, created = Users.objects.get_or_create(
                email=serializer.validated_data.get("email"),
                providers=Users.Providers.GOOGLE)
            refresh = RefreshToken.for_user(user)
            data = {
                'id' : user.pk,
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'isAdmin' : user.is_staff,
                'access': str(refresh.access_token),
            }
            return Response(data,status=status.HTTP_200_OK)
        else:
            print(serializer.errors)
            return Response({'detail':serializer.errors},status=status.HTTP_403_FORBIDDEN)
        


    @action(methods=['POST',],detail=False,url_path='github')
    def login_with_github(self,request):

        serializer = SocialLoginValidator(data=request.data)

        if serializer.is_valid():
            user, created = Users.objects.get_or_create(
                email=serializer.validated_data.get("email"),
                username=serializer.validated_data.get('username'),
                providers=Users.Providers.GITHUB)
            refresh = RefreshToken.for_user(user)

            return Response({
                'id' : user.pk,
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'isAdmin' : user.is_staff,
                'access': str(refresh.access_token),
            },status=status.HTTP_200_OK)
        else:
            return Response({'detail':serializer.errors},status=status.HTTP_403_FORBIDDEN)