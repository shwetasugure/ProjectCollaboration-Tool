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


    # # Receive message from WebSocket
    # def receive(self, text_data):
    #     text_data_json = json.loads(text_data)
    #     message = text_data_json["message"]
    #     msgtype = text_data_json["type"]
        
    #     match msgtype:
    #         case "comment":
    #             async_to_sync(self.channel_layer.group_send)(
    #                 self.room_group_name, {"type": "comment", "message": message, "msgtype": msgtype}
    #             )
    #         case "task_update":
    #             async_to_sync(self.channel_layer.group_send)(
    #                 self.room_group_name, {"type": "task.update", "message": message, "msgtype": msgtype}
    #             )
    #     print(self.scope["user"], "sent message", message)

    def task_update(self, event):
        message = event["message"]
        print(self.scope["user"],  "Updated task", message)
        self.send(text_data=json.dumps({"type": event["msgtype"], "author": self.scope["user"].id, "message": message}))
    
    def comment(self, event):
        message = event["message"]
        print(self.scope["user"],  "commented", message)
        self.send(text_data=json.dumps({"type": event["msgtype"], "author": self.scope["user"].id, "message": message}))