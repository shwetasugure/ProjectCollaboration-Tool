from django.utils.timezone import now
from django.db.models import Count, Avg, F, ExpressionWrapper, DurationField
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Task

# API for number of tasks completed per team member
@api_view(['GET'])
def tasks_completed_per_team_member(request):
    team_tasks = Task.objects.filter(status='completed') \
        .values('assigned_user__username') \
        .annotate(completedTasks=Count('id')) \
        .order_by('-completedTasks')


    return Response(team_tasks)


# API for average time spent on tasks
@api_view(['GET'])
def average_time_to_complete(request):
    try:
        # Calculate average time from task creation to completion (complete_timestamp)
        average_duration = Task.objects.filter(complete_timestamp__isnull=False).annotate(
            time_to_complete=ExpressionWrapper(
                F('complete_timestamp') - F('created_at'),
                output_field=DurationField()
            )
        ).aggregate(average_time=Avg('time_to_complete'))

        return Response({'average_time': average_duration['average_time'].days if average_duration['average_time'] else None})
    except Exception as e:
        return Response({'error': str(e)}, status=500)

# API for upcoming tasks
@api_view(['GET'])
def upcoming_tasks(request):
    today = now().date()
    upcoming = Task.objects.filter(due_date__gt=today, status__in=['todo', 'in_progress']) \
        .values('id', 'title', 'assigned_user__username', 'due_date')

    return Response(upcoming)


# API for overdue tasks
@api_view(['GET'])
def overdue_tasks(request):
    today = now().date()
    overdue = Task.objects.filter(due_date__lt=today, status__in=['todo', 'in_progress']) \
        .values('id', 'title', 'assigned_user__username', 'due_date')

    return Response(overdue)