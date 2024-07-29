from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import AllowAny, IsAuthenticated

from .serializers import *


class APIWordsViewSet(ListAPIView):
    queryset = Words.objects.all()
    serializer_class = WordSerializer
    pagination_class = LimitOffsetPagination
    permission_classes = (AllowAny,)


class APICreateWordsViewSet(CreateAPIView):
    serializer_class = WordSerializer
    permission_classes = (IsAuthenticated,)


class APILanguagesViewSet(ListAPIView):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer
    permission_classes = (AllowAny,)
