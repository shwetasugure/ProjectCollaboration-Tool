# search/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from search_indexes.views import TaskDocumentViewSet

router = DefaultRouter()
router.register(r'', TaskDocumentViewSet, basename='tasksearch')

urlpatterns = [
    path('', include(router.urls)),
]