from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from dictionary.serializers import *


class LanguageApiView(APIView):
    def get(self, request) -> Response:
        languages = Language.objects.all()
        serializer = LanguageSerializer(languages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PronounceCreateApiView(APIView):
    serializer_class = PronounceSerializer

    def post(self, request) -> Response:
        try:
            pronounce = WordPronounce.objects.get(pronounce=request.data.get('pronounce', None))
            serializer = PronounceSerializer(pronounce)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except WordPronounce.DoesNotExist:
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PronounceApiView(APIView):
    serializer_class = PronounceSerializer

    def get(self, request, word: str) -> Response:
        pronounces = WordPronounce.objects.filter(words__word=word)
        serializer = PronounceSerializer(pronounces, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserWordApiView(APIView):
    serializer_class = WordSerializer
    pagination_class = PageNumberPagination
    permission_classes = (IsAuthenticated,)

    def get(self, request) -> Response:
        words = self.request.user.words.all()
        if language := request.query_params.get('language', False):
            words = words.filter(language=language)
        if word := request.query_params.get('word', False):
            words = words.filter(word=word.capitalize())
        paginator = self.pagination_class()
        words = paginator.paginate_queryset(words, request)
        serializer = self.serializer_class(words, many=True)
        return paginator.get_paginated_response(serializer.data)


class UserAddWordApiView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request) -> Response:
        user = self.request.user
        word = request.data.get('word', None)
        language = request.data.get('language', None)
        if word is None:
            return Response('No word provided', status=status.HTTP_400_BAD_REQUEST)
        if language is None:
            return Response('No language provided', status=status.HTTP_400_BAD_REQUEST)

        language = Language.objects.get(pk=language)
        word, created = Word.objects.get_or_create(word=word, language=language)
        if created:
            word.save()
        user.add_word(word)
        user.save()
        return Response('Word added', status=status.HTTP_202_ACCEPTED)


class UserDeleteWordApiView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request) -> Response:
        user = self.request.user

        try:
            word_id = request.data.get('word_id')
        except Word.DoesNotExist:
            return Response('Word does not exist', status=status.HTTP_400_BAD_REQUEST)

        word = Word.objects.get(pk=word_id)
        user.remove_word(word)
        user.save()
        return Response('Word removed', status=status.HTTP_202_ACCEPTED)


class WordApiView(APIView):
    serializer_class = WordSerializer
    pagination_class = PageNumberPagination

    def get(self, request) -> Response:
        words = Word.objects.all()
        if language := request.query_params.get('language', False):
            words = words.filter(language=language)
        if word := request.query_params.get('word', False):
            words = words.filter(word=word.capitalize())
        paginator = self.pagination_class()
        words = paginator.paginate_queryset(words, request)
        serializer = self.serializer_class(words, many=True)
        return paginator.get_paginated_response(serializer.data)

    def post(self, request) -> Response:
        try:
            word = Word.objects.get(word=request.data.get('word', None))
            serializer = WordSerializer(word)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Word.DoesNotExist:
            serializer = WordSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
