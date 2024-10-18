from rest_framework import serializers
from .documents import TaskDocument

class TaskDocumentSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField()
    description = serializers.CharField()
    priority = serializers.CharField()
    due_date = serializers.DateField()
    completed = serializers.BooleanField()
    status = serializers.CharField()

    class Meta:
        document = TaskDocument
        fields = ['id', 'title', 'description', 'priority', 'completed', 'due_date', 'status']
        read_only_fields = ['id']
