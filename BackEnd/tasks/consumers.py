import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .models import Comment

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["task_id"]
        self.room_group_name = f"task_{self.room_name}"

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )

        self.accept()
        print(self.scope["user"], "is connected")

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )
        print(self.scope["user"], "is disconnected")

    def comment_notification(self, event):
        self.send(text_data=json.dumps(event))



class TaskConsumer(WebsocketConsumer):
    def connect(self):
        # Join a room group for the project
        self.project_id = self.scope['url_route']['kwargs']['project_id']
        self.group_name = f'project_{self.project_id}'

        # Join the group for broadcasting messages
        async_to_sync(self.channel_layer.group_add)(
            self.group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave the group when the socket is closed
        async_to_sync(self.channel_layer.group_discard)(
            self.group_name,
            self.channel_name
        )

    # Handle task notification and send to WebSocket
    def task_notification(self, event):
        self.send(text_data=json.dumps(event['event']))