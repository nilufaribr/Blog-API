from django.urls import path
from .views import (
    RegisterView, LoginView, LogoutView, ProfileView,
    PostListCreateView, PostDetailView,
    CommentListCreateView, CommentDetailView,
    LikeView, Home
)

urlpatterns = [
    # GET http://127.0.0.1:8000/api/
    path('', Home, name='home'),

    # Authentication APIs
    # POST http://127.0.0.1:8000/api/auth/register/
    path('auth/register/', RegisterView.as_view(), name='register'),

    # POST http://127.0.0.1:8000/api/auth/login/
    path('auth/login/', LoginView.as_view(), name='login'),

    # POST http://127.0.0.1:8000/api/auth/logout/
    path('auth/logout/', LogoutView.as_view(), name='logout'),

    # GET http://127.0.0.1:8000/api/auth/profile/
    path('auth/profile/', ProfileView.as_view(), name='profile'),

    # Posts APIs

    # GET  http://127.0.0.1:8000/api/posts/
    # POST http://127.0.0.1:8000/api/posts/
    path('posts/', PostListCreateView.as_view(), name='post-list'),

    # GET    http://127.0.0.1:8000/api/posts/1/
    # PUT    http://127.0.0.1:8000/api/posts/1/
    # PATCH  http://127.0.0.1:8000/api/posts/1/
    # DELETE http://127.0.0.1:8000/api/posts/1/
    path('posts/<int:pk>/', PostDetailView.as_view(), name='post-detail'),

    # Comments APIs

    # GET  http://127.0.0.1:8000/api/posts/1/comments/
    # POST http://127.0.0.1:8000/api/posts/1/comments/
    path(
        'posts/<int:post_id>/comments/',
        CommentListCreateView.as_view(),
        name='comment-list'
    ),

    # GET    http://127.0.0.1:8000/api/comments/1/
    # PUT    http://127.0.0.1:8000/api/comments/1/
    # PATCH  http://127.0.0.1:8000/api/comments/1/
    # DELETE http://127.0.0.1:8000/api/comments/1/
    path('comments/<int:pk>/', CommentDetailView.as_view(), name='comment-detail'),

    # POST http://127.0.0.1:8000/api/posts/1/like/
    path('posts/<int:post_id>/like/', LikeView.as_view(), name='like'),
]