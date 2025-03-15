import json
from enum import Enum

from accounts.models import Bottle, Message
from channels.generic.websocket import AsyncWebsocketConsumer


class MessageAction(Enum):
    CREATE = "CREATE"
    REPLY = "REPLY"
    RETURN = "RETURN"

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):        # Join room group
        await self.channel_layer.group_add(
            "default",
            self.channel_name,
        )
        self.user = self.scope["user"]

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            "default",
            self.channel_name,

        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)

        user_id = text_data_json.get('user_id','')
        message = text_data_json.get('message','')
        action = text_data_json.get('action','')
        bottle_id = text_data_json.get('bottle_id','')
        already_received_id = text_data_json.get('already_received_id','').split(',')

        if action == MessageAction.CREATE:
            #bottle = Bottle.objects.create(creator=self.user)
            #Message.objects.create(text=message, sender=self.user, bottle=bottle)
            pass
        elif action == MessageAction.REPLY:
            pass
        else:
            pass

        print(text_data_json['message'])
        print(self.user.id)
        # Send message to room group
        await self.channel_layer.group_send(
            "default",
            {
                'type': 'chat_message',
                'message': message
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))
