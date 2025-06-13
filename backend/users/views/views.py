from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from rest_framework import status
from rest_framework.decorators import action
from users.models import Users
from ..serializers.UserSerializer import UserSerializers,RegisterSerializer

class UserView(ViewSet):
    model = Users
    serializer_class = UserSerializers

    def list(self,request):
        serializer = self.serializer_class(Users.objects.all(),many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

    @action(methods=["POST"], detail=False, url_path="auth/register")
    def registerUser(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data.get("username")
            email = serializer.validated_data.get("email")
            password = serializer.validated_data.get("password")
            try:
                user = Users.objects.create(username=username, email=email)
                user.set_password(password)
                user.save()
                return Response({'info': "success"}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'info': "User with this username or email already exists!"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            print(serializer.errors.values())
            return Response({'info':serializer.errors.values()}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["POST"], detail=False, url_path="auth/register/staff")
    def registerStaffUser(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data.get("username")
            email = serializer.validated_data.get("email")
            password = serializer.validated_data.get("password")
            try:
                user = Users.objects.create(username=username, email=email,is_staff=True)
                user.set_password(password)
                user.save()
                return Response({'info': "success"}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'info': "User with this username or email already exists!"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)