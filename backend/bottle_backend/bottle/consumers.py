import json
import random
from enum import Enum

from accounts.models import Bottle, Message, OnlineUser
from asgiref.sync import SyncToAsync, sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.models import AnonymousUser, User


class MessageAction(Enum):
    CREATE = "CREATE"
    REPLY = "REPLY"
    FORWARD = "FORWARD"

@sync_to_async
def get_random_user(user_id):
    users = OnlineUser.objects.all().exclude(user__id=user_id).values_list('user__id', flat=True)
    print("Getting a random user excluding ", user_id)
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

@sync_to_async
def get_bottle_receiver(bottle_id):
    bottle = Bottle.objects.get(id=bottle_id)
    return bottle.receiver.id

class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):        # Join room group
        await self.channel_layer.group_add(
            "default",
            self.channel_name,
        )

        # Get the authenticated user
        self.user = self.scope["user"]

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
        # Delete OnlineUser if user was authenticated
        if hasattr(self, 'user') and self.user.is_authenticated:
            await delete_online_user(self.user)



    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)

        user_id = text_data_json.get('user_id', '')
        message = text_data_json.get('message','')
        bottle_id = text_data_json.get('bottle_id','')
        action = text_data_json.get('action', '')
        broadcast_object = dict()

        match action:
            case MessageAction.CREATE.value:
                # Creates a new bottle and message and assigns a random receiver
                user_instance = await get_user_by_id(user_id)
                receiver = await get_random_user(user_id)
                receiver_user =  await sync_to_async(User.objects.get)(id=receiver)
                bottle = await sync_to_async(Bottle.objects.create)(creator=user_instance, last_sent=user_instance, receiver=receiver_user)
                await sync_to_async(Message.objects.create)(text=message, sender=user_instance, bottle=bottle)
                broadcast_object["bottle_id"] = bottle.id
                broadcast_object["receiver_id"] = receiver
                print(f"Created a bottle {bottle.id} {bottle.creator.id} {bottle.receiver.id}")

            case MessageAction.REPLY.value:
                # Creates a new message and assigns it to the original bottle creator
                print(f"REPLYING BOTTLE")
                bottle = await sync_to_async(Bottle.objects.get)(id=bottle_id)
                broadcast_object["bottle_id"] = bottle.id
                broadcast_object["receiver_id"] = await get_bottle_receiver(bottle.id)

            case MessageAction.FORWARD.value:
                bottle = await sync_to_async(Bottle.objects.get)(id=bottle_id)
                broadcast_object["bottle_id"] = bottle.id
                broadcast_object["receiver_id"] = await get_random_user(user_id)

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
