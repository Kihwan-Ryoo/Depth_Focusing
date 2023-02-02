from django.urls import path
from .views import PhotoDetail, GetUploadURL, GetDeepLearningImage

urlpatterns = [
    path("photos/<int:pk>", PhotoDetail.as_view()),
    path("photos/get-url", GetUploadURL.as_view()),
    path("photos/asdasd", GetDeepLearningImage.as_view()),
]
