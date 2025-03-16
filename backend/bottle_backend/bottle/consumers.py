import json
import random
from enum import Enum

from accounts.models import Bottle, Message, OnlineUser
from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.models import AnonymousUser, User


class MessageAction(Enum):
    CREATE = "CREATE"
    REPLY = "REPLY"
    FORWARD = "FORWARD"

@sync_to_async
def get_random_user(bottle):
    users = OnlineUser.objects.all().exclude(id=bottle.creator.id).values_list('user__id', flat=True) 
    if users.exists():
        return random.choice(users)
    else:
        return None

@sync_to_async
def get_user_by_id(user_id):
    return User.objects.get(id=user_id)

@sync_to_async
def create_online_user(user):
    # Get the actual User instance when given a UserLazyObject
    if hasattr(user, '_wrapped'):
        user = user._wrapped
    if not isinstance(user, AnonymousUser):
        return OnlineUser.objects.create(user=user)
    return None

@sync_to_async
def delete_online_user(user):
    # Get the actual User instance when given a UserLazyObject
    if hasattr(user, '_wrapped'):
        user = user._wrapped
    if not isinstance(user, AnonymousUser):
        OnlineUser.objects.filter(user=user).delete()
    return None

class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):        # Join room group
        await self.channel_layer.group_add(
            "default",
            self.channel_name,
        )
        
        # Get the authenticated user
        self.user = self.scope["user"]

        print(self.scope["user"])
        
        # Check if user is authenticated before creating OnlineUser
        if self.user.is_authenticated:
            await create_online_user(self.user)
        
        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            "default",
            self.channel_name,
        )
        print(hasattr(self, 'user') )
        print(self.user.is_authenticated)
        # Delete OnlineUser if user was authenticated
        if hasattr(self, 'user') and self.user.is_authenticated:
            await delete_online_user(self.user)

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        
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