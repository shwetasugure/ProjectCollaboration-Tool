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
        user = self.request.user

        project = Project.objects.get(id=project_id)
        if self.request.user not in project.collaborators.all() and self.request.user != project.owner:
            raise PermissionDenied("You do not have permission to view tasks in this project")

        return Task.objects.filter(
            Q(project__owner=user) | Q(project__collaborators=user),
            project__id=project_id
        ).distinct()

    def perform_create(self, serializer):
        project_id = self.kwargs.get('project_id')
        project = Project.objects.get(id=project_id)

        if self.request.user not in project.collaborators.all() and self.request.user != project.owner:
            raise PermissionDenied("You do not have permission to add tasks to this project")

        task = serializer.save(project_id=project_id)
        self.notify_task_event('task_created', task)

    def perform_update(self, serializer):
        task = serializer.save()
        self.notify_task_event('task_updated', task)

    def perform_destroy(self, instance):
        self.notify_task_event('task_deleted', instance)
        instance.delete()

    def notify_task_event(self, event_type, task):
        channel_layer = get_channel_layer()
        project_id = self.kwargs.get('project_id')

        # Prepare message data
        message = {
            'type': event_type,
            'task': TaskSerializer(task).data
        }

        # Send to the appropriate WebSocket group
        async_to_sync(channel_layer.group_send)(
            f'project_{project_id}',
            {
                'type': 'task.notification',
                'event': message
            }
        )

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

class TaskCommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        task_id = self.kwargs.get('task_id')
        return Comment.objects.filter(task__id=task_id)

    def perform_create(self, serializer):
        task_id = self.kwargs.get('task_id')
        task = get_object_or_404(Task, id=task_id)

        # Check permissions before creating the comment
        if self.request.user not in task.project.collaborators.all() and self.request.user != task.project.owner:
            raise PermissionDenied("You do not have permission to add comments to this task")

        # Save the comment and notify via WebSocket
        comment = serializer.save(author=self.request.user, task=task)
        self.notify_comment_event('comment_created', comment)

    def perform_update(self, serializer):
        # Update the comment and notify via WebSocket
        comment = serializer.save()
        self.notify_comment_event('comment_updated', comment)

    def perform_destroy(self, instance):
        # Notify via WebSocket before deleting the comment
        self.notify_comment_event('comment_deleted', instance)
        instance.delete()

    def notify_comment_event(self, event_type, comment):
        task_id = comment.task.id
        channel_layer = get_channel_layer()

        # Prepare message data
        message = {
            'type': event_type,
            'comment': CommentSerializer(comment).data
        }

        # Send to the appropriate WebSocket group
        async_to_sync(channel_layer.group_send)(
            f'task_{task_id}',
            {
                'type': 'comment.notification',
                'event': message
            }
        )

    def get_permissions(self):
        # Apply different permissions based on action
        if self.action == 'destroy':
            self.permission_classes = [IsAuthenticated, IsCommentAuthor]
        else:
            self.permission_classes = [IsAuthenticated, IsProjectOwnerOrCollaborator]
        return super().get_permissions()
