from django.urls import re_path, path
from .consumers import ChatConsumer, TaskConsumer

websocket_urlpatterns = [
    re_path(r"ws/chat/(?P<task_id>\w+)/$", ChatConsumer.as_asgi()),
    path('ws/project/<int:project_id>/', TaskConsumer.as_asgi()),
]