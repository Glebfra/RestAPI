from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView

from dictionary.models import Word, WordPronounce
from dictionary.serializers import (
    PronounceSerializer, WordDetailedSerializer, WordSerializer
)


class PronounceCreateApiView(APIView):
    serializer_class = PronounceSerializer

    def post(self, request):
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

    def get(self, request, word: str):
        pronounces = WordPronounce.objects.filter(words__word=word)
        serializer = PronounceSerializer(pronounces, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class WordApiView(APIView):
    serializer_class = WordSerializer
    pagination_class = PageNumberPagination

    def get(self, request):
        words = Word.objects.all()
        paginator = self.pagination_class()
        words = paginator.paginate_queryset(words, request)
        serializer = self.serializer_class(words, many=True)
        return paginator.get_paginated_response(serializer.data)

    def post(self, request):
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


class WordDetailedApiView(APIView):
    serializer_class = WordDetailedSerializer

    def get(self, request, pk: int):
        word = Word.objects.get(pk=pk)
        serializer = self.serializer_class(word)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, pk: int):
        word = Word.objects.get(pk=pk)
        serializer = self.serializer_class(word, request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk: int):
        word = Word.objects.get(pk=pk)
        serializer = self.serializer_class(word, request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
