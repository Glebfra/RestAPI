from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from rest_framework.viewsets import ModelViewSet

from .models import Language, Words
from .serializers import LanguageSerializer, WordSerializer


class BaseAPIViewSet(ModelViewSet):
    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class APIWordsViewSet(BaseAPIViewSet):
    queryset = Words.objects.all()
    serializer_class = WordSerializer


class APILanguagesViewSet(BaseAPIViewSet):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer
