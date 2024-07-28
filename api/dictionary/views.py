from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import *
from rest_framework.views import APIView

from .serializers import *


class APIWordsViewSet(APIView):
    pagination_class = LimitOffsetPagination
    permission_classes = (AllowAny,)

    def get(self, request):
        queryset = Words.objects.all()
        query_params = self.request.query_params
        if (language := query_params.get('language')) is not None:
            queryset = queryset.filter(language__id=language)
        if (word := query_params.get('word')) is not None:
            queryset = queryset.filter(word__contains=word.capitalize())
        if (words := query_params.get('words')) is not None:
            queryset = queryset.filter(word__in=words.split(';'))

        pagination = self.pagination_class()
        paginated_queryset = pagination.paginate_queryset(queryset, request, view=self)
        serializer = WordSerializer(paginated_queryset, many=True)
        return pagination.get_paginated_response(serializer.data)


class APILanguagesViewSet(APIView):
    pagination_class = LimitOffsetPagination
    permission_classes = (AllowAny,)

    def get(self, request):
        queryset = Language.objects.all()
        serializer = LanguageSerializer(queryset, many=True)
        return Response(serializer.data, status=HTTP_200_OK)
