from rest_framework import serializers

from .models import *


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = '__all__'


class TranslationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = ('id', 'word', 'language')


class PronounceSerializer(serializers.ModelSerializer):
    class Meta:
        model = WordPronounce
        fields = ('id', 'pronounce')


class WordSerializer(serializers.ModelSerializer):
    translations = TranslationSerializer(many=True, read_only=True)
    pronounces = PronounceSerializer(many=True, read_only=True)

    class Meta:
        model = Word
        fields = ('id', 'word', 'language', 'translations', 'pronounces')
