from django.urls import path
from .views import (
    RegisterView, LoginView, LogoutView, ProfileView,
    PostListCreateView, PostDetailView,
    CommentListCreateView, CommentDetailView,
    LikeView, Home
)

urlpatterns = [
    path('', Home, name='home'),
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    path('auth/profile/', ProfileView.as_view(), name='profile'),

    path('posts/', PostListCreateView.as_view(), name='post-list'),
    path('posts/<int:pk>/', PostDetailView.as_view(), name='post-detail'),

    path('posts/<int:post_id>/comments/', CommentListCreateView.as_view(), name='comment-list'),
    path('comments/<int:pk>/', CommentDetailView.as_view(), name='comment-detail'),

    path('posts/<int:post_id>/like/', LikeView.as_view(), name='like'),
]