from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArticleViewSet, CommentViewSet
from . import views

router = DefaultRouter()
router.register(r'articles', ArticleViewSet)
router.register(r'comments', CommentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('list/', views.article_list, name='article_list'),
    path('update_like_users/<int:articleId>/', views.update_like_users, name='update_like_users'),
]