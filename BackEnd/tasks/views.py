from rest_framework import viewsets, generics
from .models import Project, Task
from .serializers import ProjectSerializer, TaskSerializer
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.exceptions import PermissionDenied

from .serializers import UserSerializer
from django.contrib.auth.models import User

from django.db.models import Q

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