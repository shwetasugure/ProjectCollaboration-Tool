from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.http import HttpResponse
from tasks.views import UserCreateView

# Define a simple view for the root URL
def home(request):
    return HttpResponse("Welcome to the Project Collaboration Tool!")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', UserCreateView.as_view(), name='register'),
    path('api/', include('tasks.urls')),  # Include task app URLs
    path('', home),
]
