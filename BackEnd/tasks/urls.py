from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, TaskViewSet, UserListView

router = DefaultRouter()
router.register(r'project', ProjectViewSet, basename="project")

# We will manually handle the task routes under projects
urlpatterns = [
    path('', include(router.urls)),  # Project URLs
    path('project/<int:project_id>/task/', TaskViewSet.as_view({'get': 'list', 'post': 'create'}), name='task-list'),
    path('project/<int:project_id>/task/<int:pk>/', TaskViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='task-detail'),
    path('users/', UserListView.as_view(), name='user-list'),
]