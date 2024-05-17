from django.urls import path,include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'user',views.UserViewSet)

app_name = 'accounts'
urlpatterns = [
    path('save-users/', views.save_user, name="save_user"),
    path('',include(router.urls)),
]
