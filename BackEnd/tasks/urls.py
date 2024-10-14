from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, TaskViewSet, UserListView, TaskCommentView

router = DefaultRouter()
router.register(r'project', ProjectViewSet, basename="project")

urlpatterns = [
    path('', include(router.urls)),

    path('project/<int:project_id>/task/', TaskViewSet.as_view({'get': 'list', 'post': 'create'}), name='task-list'),
    path('project/<int:project_id>/task/<int:pk>/', TaskViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='task-detail'),

    path('comments/<int:task_id>/', TaskCommentView.as_view({'get': 'list', 'post': 'create'}), name='task-comments-list-create'),
    path('comments/<int:task_id>/<int:pk>/', TaskCommentView.as_view({'get': 'retrieve', 'delete': 'destroy'}), name='task-comments-detail'),
    
    path('users/', UserListView.as_view(), name='user-list'),
]