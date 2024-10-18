from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry
from tasks.models import Task

@registry.register_document
class TaskDocument(Document):
    id = fields.IntegerField(attr='id')  # Explicitly define the id field

    user = fields.ObjectField(properties={  # Define the user field as an ObjectField
        'id': fields.IntegerField(),
        'username': fields.TextField(),
    })
    class Index:
        name = 'tasks'
        settings = {
            'number_of_shards': 1,
            'number_of_replicas': 0
        }

    class Django:
        model = Task
        fields = [
            'title',
            'description',
            'priority',
            'due_date',
            'status',     # Add this field if it exists
            'completed',
        ]
