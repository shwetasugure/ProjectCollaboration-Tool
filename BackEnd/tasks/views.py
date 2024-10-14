from rest_framework import viewsets, generics
from .models import Project, Task, Comment
from .serializers import ProjectSerializer, TaskSerializer, CommentSerializer
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404

from .serializers import UserSerializer
from django.contrib.auth.models import User

from django.db.models import Q

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
import json

class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        user = self.request.user
        return Project.objects.filter(Q(owner=user) | Q(collaborators=user)).distinct()

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        project_id = self.kwargs.get('project_id')
        print("this is project id:", project_id)
        user = self.request.user
        tasks = Task.objects.filter(
            Q(project__owner=user) | Q(project__collaborators=user),
            project__id=project_id
        ).distinct()
        if not tasks:
            raise PermissionDenied("You do not have permission to view tasks in this project")
        return tasks

    def perform_create(self, serializer):
        project_id = self.kwargs.get('project_id')

        project = Project.objects.get(id=project_id)
        if self.request.user not in project.collaborators.all() and self.request.user != project.owner:
            raise PermissionDenied("You do not have permission to add tasks to this project")

        serializer.save(project_id=project_id)

class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    def get_queryset(self):
        return User.objects.filter(~Q(id=self.request.user.id))

class IsProjectOwnerOrCollaborator(BasePermission):
    def has_permission(self, request, view):
        task_id = view.kwargs.get('task_id')
        task = get_object_or_404(Task, id=task_id)
        return task.project.owner == request.user or task.project.collaborators.filter(id=request.user.id).exists()


class IsCommentAuthor(BasePermission):
    def has_object_permission(self, request, view, obj):
        # Check if the comment's author is the request user
        return obj.author == request.user



class TaskCommentView(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated, IsProjectOwnerOrCollaborator, IsCommentAuthor]
    def get_queryset(self):
        task_id = self.kwargs.get('task_id')
        return Comment.objects.filter(task__id=task_id)

    def perform_create(self, serializer):
        task_id = self.kwargs.get('task_id')
        task = get_object_or_404(Task, id=task_id)
        comment = serializer.save(author=self.request.user, task=task)

        # Send a WebSocket message to the task's room
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f"task_{task_id}",
            {
                "type": "comment",
                "msgtype": "comment.created",
                "message": json.dumps(CommentSerializer(comment).data),
            }
        )

    def perform_update(self, serializer):
        comment = serializer.save()
        # Send a WebSocket message when a comment is updated
        channel_layer = get_channel_layer()
        task_id = comment.task.id
        async_to_sync(channel_layer.group_send)(
            f"task_{task_id}",
            {
                "type": "comment",
                "msgtype": "comment.updated",
                "message": json.dumps(CommentSerializer(comment).data),
            }
        )

    def perform_destroy(self, instance):
        task_id = instance.task.id
        # Send a WebSocket message when a comment is deleted
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f"task_{task_id}",
            {
                "type": "comment",
                "msgtype": "comment.deleted",
                "message": json.dumps(CommentSerializer(instance).data),
            }
        )
        # Actually delete the comment
        instance.delete()

    def get_permissions(self):
        if self.action == 'destroy':
            self.permission_classes = [IsAuthenticated, IsCommentAuthor]
        else:
            self.permission_classes = [IsAuthenticated, IsProjectOwnerOrCollaborator]
        return super(TaskCommentView, self).get_permissions()