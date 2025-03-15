import json
from django.http import HttpResponse
from django.shortcuts import render
from django.http import HttpResponse

from django.contrib.auth.models import User
from accounts.models import Bottle

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status


# Create your views here.
def index(request):
    return HttpResponse("Hello World")


@api_view(['GET'])
@permission_classes([AllowAny])
def bottles_for_user(request, user_id):
    bottle_list = [
        {"id": 1, "name": "Bottle 1", "description": "This is a sample bottle."},
        {"id": 2, "name": "Bottle 2", "description": "Another sample bottle."},
        {"id": 3, "name": "Bottle 3", "description": "Yet another sample bottle."}
    ]

    return Response({"bottles": bottle_list}, status=status.HTTP_200_OK)
    try:
        user = User.objects.get(id=user_id)

        # Retrieve the user
        # Get all bottles related to this user (assuming you have a ForeignKey relationship)
        bottles = Bottle.objects.filter(creator=user)

        # Serialize the bottles data (assuming you have a Bottle serializer)
        bottle_list = [{"id": bottle.id, "name": bottle.name, "description": bottle.description} for bottle in bottles]
        return json.dumps({"bottles": bottle_list}, status=200)


    except User.DoesNotExist:
        return json.dumps({"error": "User not found"}, status=404)


def websocket_test(request):
    # Add the server's host and port to help with debugging
    host = request.get_host()

    html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>WebSocket Test</title>
        <style>
            #messages {{
                height: 300px;
                overflow-y: scroll;
                border: 1px solid #ccc;
                padding: 10px;
                margin-bottom: 10px;
            }}
            .message {{
                margin-bottom: 5px;
                padding: 5px;
                background-color: #f0f0f0;
                border-radius: 5px;
            }}
        </style>
    </head>
    <body>
        <h1>WebSocket Test</h1>
        <p>Server: {host}</p>
        <div>
            <label for="roomInput">Room:</label>
            <input id="roomInput" type="text" value="testroom" placeholder="Enter room name">
            <button onclick="connectWebSocket()">Connect</button>
            <button onclick="disconnectWebSocket()">Disconnect</button>
        </div>
        <div id="connection-status">Status: Disconnected</div>
        <div id="messages"></div>
        <div>
            <input id="messageInput" type="text" placeholder="Type a message">
            <button onclick="sendMessage()">Send</button>
        </div>

        <script>
            let socket = null;

            function connectWebSocket() {{
                const roomName = document.getElementById('roomInput').value;
                if (!roomName) {{
                    alert('Please enter a room name');
                    return;
                }}

                // Close existing connection if any
                if (socket) {{
                    socket.close();
                }}

                // Create new WebSocket connection
                const wsProtocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
                const wsUrl = wsProtocol + window.location.host + '/ws/';

                addMessage('Debug', 'Connecting to: ' + wsUrl);

                socket = new WebSocket(wsUrl);

                document.getElementById('connection-status').textContent = 'Status: Connecting...';

                socket.onopen = function(e) {{
                    document.getElementById('connection-status').textContent = 'Status: Connected to ' + roomName;
                    addMessage('System', 'Connected to room: ' + roomName);
                }};

                socket.onmessage = function(e) {{
                    const data = JSON.parse(e.data);
                    addMessage('Received', data.message);
                }};

                socket.onclose = function(e) {{
                    document.getElementById('connection-status').textContent = 'Status: Disconnected';
                    addMessage('System', 'Disconnected from WebSocket. Code: ' + e.code + ', Reason: ' + e.reason);
                }};

                socket.onerror = function(e) {{
                    document.getElementById('connection-status').textContent = 'Status: Error';
                    addMessage('Error', 'WebSocket error occurred');
                    console.error('WebSocket error:', e);
                }};
            }}

            function disconnectWebSocket() {{
                if (socket) {{
                    socket.close();
                    socket = null;
                }}
            }}

            function sendMessage() {{
                if (!socket || socket.readyState !== WebSocket.OPEN) {{
                    alert('WebSocket is not connected');
                    return;
                }}

                const messageInput = document.getElementById('messageInput');
                const message = messageInput.value;
                if (!message) {{
                    alert('Please enter a message');
                    return;
                }}

                socket.send(JSON.stringify({{
                    'message': message
                }}));

                addMessage('Sent', message);
                messageInput.value = '';
            }}

            function addMessage(type, message) {{
                const messagesDiv = document.getElementById('messages');
                const messageElement = document.createElement('div');
                messageElement.className = 'message';
                messageElement.textContent = `[${{type}}] ${{message}}`;
                messagesDiv.appendChild(messageElement);
                messagesDiv.scrollTop = messagesDiv.scrollHeight;
            }}
        </script>
    </body>
    </html>
    """
    return HttpResponse(html)

# def get_all_bottles(request):
#     # bottle_list = Bottle.objects.all()
#     # print(bottle_list)
#     return {}

# def get_bottle(request, bottle_id):
#     # bottle = Bottle.objects.all()
#     return

# def get_message(request, message_id):
#     return

# def get_messages(request, bottle_id):
#     return

# def get_user(request, user_id):
#     return
