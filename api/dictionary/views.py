from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_202_ACCEPTED, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Language, Words
from .serializers import LanguageSerializer, WordSerializer


class APIWordsViewSet(APIView):
    pagination_class = LimitOffsetPagination
    permission_classes = (AllowAny,)

    def get(self, request, pk=None):
        if pk is not None:
            queryset = Words.objects.filter(pk=pk)
        else:
            queryset = Words.objects.all()
        query_params = self.request.query_params
        if (language := query_params.get('language')) is not None:
            queryset = queryset.filter(language__id=language)
        if (word := query_params.get('word')) is not None:
            queryset = queryset.filter(word__contains=word)
        if (words := query_params.get('words')) is not None:
            queryset = queryset.filter(word__in=words.split(';'))

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
        if (words := query_params.get('words')) is not None:
            queryset = queryset.filter(word__in=words.split(';'))

        pagination = self.pagination_class()
        paginated_queryset = pagination.paginate_queryset(queryset, request, view=self)
        serializer = WordSerializer(paginated_queryset, many=True)
        return pagination.get_paginated_response(serializer.data)

    def post(self, request):
        serializer = WordSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def patch(self, request, pk=None):
        word = Words.objects.get(pk=pk)
        data = request.data
        if (translations := data.get('translations')) is not None:
            new_translations = []
            new_translations_words = []
            for translation in translations:
                if isinstance(translation, int):
                    new_translations.append(translation)
                if isinstance(translation, dict):
                    language = Language.objects.get(pk=translation['language'])
                    new_translation_word, created = Words.objects.get_or_create(
                        word=translation['word'],
                        language=language
                    )
                    if created:
                        new_translation_word.save()
                    new_translations_words.append(new_translation_word)
                    new_translations.append(new_translation_word.pk)
            for i in range(len(new_translations) - 1):
                for j in range(i+1, len(new_translations_words)):
                    new_translations_words[i].translations.add(new_translations_words[j].pk)
            data['translations'] = new_translations
        serializer = WordSerializer(word, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        word = Words.objects.get(pk=pk)
        word.delete()
        return Response(status=HTTP_202_ACCEPTED)
