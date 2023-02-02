from django.conf import settings
import requests

from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK

from users import serializers
from .models import Photo


class PhotoDetail(APIView):

    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Photo.objects.get(pk=pk)
        except Photo.DoesNotExist:
            raise NotFound

    def delete(self, request, pk):
        photo = self.get_object(pk)
        if photo.user and photo.user != request.user:
            raise PermissionDenied
        photo.delete()
        return Response(status=HTTP_200_OK)


class GetUploadURL(APIView):
    def post(self, request):
        url = f"https://api.cloudflare.com/client/v4/accounts/{settings.CF_ID}/images/v2/direct_upload"
        one_time_url = requests.post(
            url,
            headers={
                "Authorization": f"Bearer {settings.CF_TOKEN}",
            },
        )

        one_time_url = one_time_url.json()
        result = one_time_url.get("result")
        return Response({"uploadURL": result.get("uploadURL")})


# 우석님 파트
class GetDeepLearningImage(APIView):
    def post(self, request):
        # 이미지를 받아서 딥러닝 모델을 돌려준 결과를 response(프론트엔드에게)
        pass
