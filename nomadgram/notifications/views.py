from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers
# Create your views here.


class Notifications(APIView):

    def get(self, request, format=None):

        user = request.user

        notification = models.Notifications.objects.filter(to=user)

        serializer = serializers.NotificationSerializer(notification, many=True, context={"request": request})

        return Response(data=serializer.data, status=status.HTTP_200_OK)


def create_notification(creator, to, notification_type, image=None, comment=None):

    notification = models.Notifications.objects.create(
        creator=creator,
        to=to,
        notification_type=notification_type,
        image=image,
        comment=comment
    )
