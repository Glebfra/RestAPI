from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Language, Words
from .serializers import LanguageSerializer, WordSerializer


class APIWordsViewSet(APIView):
    pagination_class = LimitOffsetPagination

    def get(self, request):
        queryset = Words.objects.all()
        pagination = self.pagination_class()
        paginated_queryset = pagination.paginate_queryset(queryset, request, view=self)
        serializer = WordSerializer(paginated_queryset, many=True)
        return pagination.get_paginated_response(serializer.data)


class APILanguagesViewSet(APIView):
    pagination_class = LimitOffsetPagination

    def get(self, request):
        queryset = Language.objects.all()
        pagination = self.pagination_class()
        paginated_queryset = pagination.paginate_queryset(queryset, request, view=self)
        serializer = LanguageSerializer(paginated_queryset, many=True)
        return pagination.get_paginated_response(serializer.data)


class APIUserWordsViewSet(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)
    pagination_class = LimitOffsetPagination

    def get(self, request):
        queryset = request.user.words.all()
        query_params = self.request.query_params
        if (language := query_params.get('language')) is not None:
            queryset = queryset.filter(language__id=language)
        if (word := query_params.get('word')) is not None:
            queryset = queryset.filter(word__contains=word)

        pagination = self.pagination_class()
        paginated_queryset = pagination.paginate_queryset(queryset, request, view=self)
        serializer = WordSerializer(paginated_queryset, many=True)
        return pagination.get_paginated_response(serializer.data)
