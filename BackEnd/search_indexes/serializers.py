from django_elasticsearch_dsl_drf.serializers import DocumentSerializer
from .documents import TaskDocument

class TaskDocumentSerializer(DocumentSerializer):
    class Meta:
        document = TaskDocument
        fields = ['id', 'title', 'description', 'priority', 'completed', 'due_date']
        read_only_fields = ['id', 'created_at', 'updated_at']
