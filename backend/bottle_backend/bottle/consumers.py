import json
import random
from enum import Enum

from accounts.models import Bottle, Message
from channels.generic.websocket import AsyncWebsocketConsumer


class MessageAction(Enum):
    CREATE = "CREATE"
    REPLY = "REPLY"
    RETURN = "RETURN"

def get_random_user():
    bottles = Bottle.objects.only('id')
    id_list = [bottle.id for bottle in bottles]
    return random.choice(id_list)

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

        broadcast_object = {
            'id': '1',
            'send_to': '2'
        }

        # Trigger lazy loading of user
        a = str(self.user)

        print(user_id, message, action, bottle_id, already_received_id)
        if action == MessageAction.CREATE.value:
            bottle = Bottle.objects.create(creator=self.user)
            Message.objects.create(text=message, sender=self.user, bottle=bottle)
            print(bottle)
            broadcast_object['id'] = bottle.id
            broadcast_object['send_to'] = get_random_user()
        elif action == MessageAction.REPLY.value:
            bottle = Bottle.objects.get(id=bottle_id)
            Message.objects.create(text=message, sender=self.user, bottle=bottle)
            broadcast_object['id'] = bottle.id
            broadcast_object['send_to'] = get_random_user()
        elif action == MessageAction.RETURN.value:
            bottle = Bottle.objects.get(id=bottle_id)
            broadcast_object['id'] = bottle.id
            broadcast_object['send_to'] = bottle.creator.id
        else:
            print("shouldn't be here")
            pass

        print("GROUP SEND MOTHERFUCKER")
        print(broadcast_object)
        await self.channel_layer.group_send(
            "default",
            {
                'type': 'chat_message',
                'message': broadcast_object
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))
