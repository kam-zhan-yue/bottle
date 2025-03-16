from urllib.parse import parse_qs

from channels.db import database_sync_to_async
from channels.middleware import BaseMiddleware
from django.contrib.auth.models import AnonymousUser, User


@database_sync_to_async
def get_user(user_id):
    try:
        return User.objects.get(id=user_id)
    except User.DoesNotExist:
        return AnonymousUser()

class UserIdMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        # Try to get user_id from query string
        query_string = parse_qs(scope.get("query_string", b"").decode())
        user_id = query_string.get("user_id", [None])[0]
        
        if user_id:
            # Set user in scope
            scope["user"] = await get_user(user_id)
        else:
            # User is anonymous
            scope["user"] = AnonymousUser()
            
        return await super().__call__(scope, receive, send)