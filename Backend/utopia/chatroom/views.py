from rest_framework.views import APIView
from rest_framework.response import Response
from .pusher import pusher_client
from authUser.models import User
from rest_framework.permissions import IsAuthenticated
from .serializers import ChatRoomSerializer
from rest_framework import status
from .models import chatRoom
# Create your views here.


class MessageView(APIView):
    serializer_class = ChatRoomSerializer
    permission_classes = [IsAuthenticated]
    lookup_url_kwargs = 'code'

    def post(self, request, format=None):
        # username = User.objects.get(username=request.user.username)
        # print(username)
        username = self.request.user.username
        channel_name = request.data['channel']
        print(channel_name)
        message = request.data['message']
        pusher_client.trigger(channel_name, 'message',
                              {
                                  'username': username,
                                  'message': message
                              })
        serialisers = self.serializer_class(data=request.data)
        # serialisers.data["username"] = username
        # need to create a serializer
        if(serialisers.is_valid()):
            user = request.user
            chat = chatRoom(user=user, username=username,
                            channel_name=channel_name, message=message)
            chat.save()
            return Response(ChatRoomSerializer(chat).data, status=status.HTTP_201_CREATED)
        return Response({'msg': 'bad request'}, status=status.HTTP_400_BAD_REQUEST)
