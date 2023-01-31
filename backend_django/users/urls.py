from django.urls import path
from . import views

urlpatterns = [
    path("", views.Users.as_view()),
    path("me", views.Me.as_view()),
    path("log-in", views.LogIn.as_view()),
    # path("log-out", views.Me.as_view()),
    path("me", views.Me.as_view()),
]
