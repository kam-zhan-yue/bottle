import json
import random
from enum import Enum

from accounts.models import Bottle, Message
from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.models import User

class MessageAction(Enum):
    CREATE = "CREATE"
    REPLY = "REPLY"
    FORWARD = "FORWARD"

@sync_to_async
def get_random_user(bottle):
    users = User.objects.exclude(id=bottle.creator.id).values_list('id', flat=True)
    return random.choice(list(users))

@sync_to_async
def get_user_by_id(user_id):
    return User.objects.get(id=user_id)

class ChatConsumer(AsyncWebsocketConsumer):



    async def connect(self):        # Join room group
        await self.channel_layer.group_add(
            "default",
            self.channel_name,
        )

        ## TODO: Make sure auth gets this right and is inejcted in via middleware
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

        user_id = text_data_json.get('user_id','') # might not be needed
        message = text_data_json.get('message','')
        bottle_id = text_data_json.get('bottle_id','')
        action = text_data_json.get('action', '')
        broadcast_object = dict()

        match action:
            case MessageAction.CREATE.value:
                # Creates a new bottle and message and assigns a random receiver
                user_instance = await get_user_by_id(self.user.id)
                bottle = await sync_to_async(Bottle.objects.create)(creator=user_instance)
                await sync_to_async(Message.objects.create)(text=message, sender=user_instance, bottle=bottle)
                broadcast_object["bottle_id"] = bottle.id
                broadcast_object["receiver_id"] = await get_random_user(bottle)

            case MessageAction.REPLY.value:
                # Creates a new message and assigns it to the original bottle creator
                bottle = await sync_to_async(Bottle.objects.get)(id=bottle_id)
                broadcast_object["bottle_id"] = bottle.id
                broadcast_object["receiver_id"] = bottle.creator.id

            case MessageAction.FORWARD.value:

                bottle = await sync_to_async(Bottle.objects.get)(id=bottle_id)
                broadcast_object["bottle_id"] = bottle.id
                broadcast_object["receiver_id"] = await get_random_user(bottle)

        await self.channel_layer.group_send(
            "default",
            {
                'type': 'action',
                'message': {k: str(v) for k, v in broadcast_object.items()}
            }
        )

    # Receive message from room group
    async def action(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))
