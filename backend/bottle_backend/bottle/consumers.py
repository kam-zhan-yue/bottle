
import json

from channels.generic.websocket import AsyncWebsocketConsumer


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
        message = text_data_json['message']['user_id']
        print(text_data_json['message'])
        print(self.user.id)

        # random, figure who to send to 

        if self.user.id != text_data_json['message']['user_id']:
            return
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