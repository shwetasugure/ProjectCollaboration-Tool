from rest_framework import serializers
from .models import Project, Task, Comment
from django.contrib.auth.models import User


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ["id", "name", "description", "collaborators", "owner"]
        read_only_fields = ['owner', "id"] 
    
    # collaborators should be list of id with username
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['owner'] = {"id": instance.owner.id, "username": instance.owner.username}
        data['collaborators'] = [{"id": user.id, "username": user.username} for user in instance.collaborators.all()]
        return data

class TaskSerializer(serializers.ModelSerializer):
    assigned_user_username = serializers.SerializerMethodField()
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'assigned_user', 'assigned_user_username', 'status', 'due_date', 'priority', 'project', 'complete_timestamp']
        read_only_fields = ['project', 'complete_timestamp', 'assigned_user_username']

    def get_assigned_user_username(self, obj):
        return obj.assigned_user.username if obj.assigned_user else None

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        read_only_fields = ['id']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class CommentSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Comment
        fields = ['id', 'task', 'author', 'text', 'created_at']
        read_only_fields = ['author', 'created_at', 'id', 'task', 'created_at']
