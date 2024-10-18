from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, TaskViewSet, UserListView, TaskCommentViewSet
from .analytics import tasks_completed_per_team_member, average_time_to_complete, upcoming_tasks, overdue_tasks

router = DefaultRouter()
router.register(r'project', ProjectViewSet, basename="project")

urlpatterns = [
    path('', include(router.urls)),

    path('project/<int:project_id>/task/', TaskViewSet.as_view({'get': 'list', 'post': 'create'}), name='task-list'),
    path('project/<int:project_id>/task/<int:pk>/', TaskViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='task-detail'),

    path('comments/<int:task_id>/', TaskCommentViewSet.as_view({'get': 'list', 'post': 'create'}), name='task-comments-list-create'),
    path('comments/<int:task_id>/<int:pk>/', TaskCommentViewSet.as_view({'get': 'retrieve', 'delete': 'destroy'}), name='task-comments-detail'),

    path('users/', UserListView.as_view(), name='user-list'),

    path('analytics/team-tasks-completed/', tasks_completed_per_team_member, name='team-tasks-completed'),
    path('analytics/average-time-to-complete/', average_time_to_complete, name='average-time-to-complete'),
    path('analytics/upcoming-tasks/', upcoming_tasks, name='upcoming-tasks'),
    path('analytics/overdue-tasks/', overdue_tasks, name='overdue-tasks'),
]