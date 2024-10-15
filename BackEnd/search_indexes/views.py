from django_elasticsearch_dsl_drf.viewsets import BaseDocumentViewSet
from django_elasticsearch_dsl_drf.filter_backends import (
    FilteringFilterBackend,
    OrderingFilterBackend,
    SearchFilterBackend,
)
from .documents import TaskDocument
from .serializers import TaskDocumentSerializer
from rest_framework.pagination import PageNumberPagination

from rest_framework.permissions import IsAuthenticated

class TaskDocumentPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 100

class TaskDocumentViewSet(BaseDocumentViewSet):
    document = TaskDocument
    serializer_class = TaskDocumentSerializer
    pagination_class = TaskDocumentPagination
    permission_classes = [IsAuthenticated]

    filter_backends = [
        FilteringFilterBackend,
        OrderingFilterBackend,
        SearchFilterBackend,
    ]
    
    # Fields that can be searched
    search_fields = {
        'title': {
            'fuzziness': 'AUTO',
            'operator': 'or',
            'prefix_length': 1,
        },
        'description': {
            'fuzziness': 'AUTO',
            'operator': 'or',
            'prefix_length': 1,
        },
    }

    # Fields that can be filtered
    filter_fields = {
        'priority': 'priority',
        'completed': 'completed',
        'due_date': 'due_date',
    }

    # Fields that can be ordered
    ordering_fields = {
        'due_date': 'due_date',
        # 'priority': 'priority.keyword',
        'completed': 'completed',
    }
    
    # Default ordering
    # ordering = ('due_date', 'priority', 'completed')

    # def filter_queryset(self, queryset):
        # return queryset.filter('term', user__id=self.request.user.id)