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
    class Meta:
        model = Word
        fields = ('id', 'word', 'language')


class WordDetailedSerializer(serializers.ModelSerializer):
    translations_details = TranslationSerializer(source='translations', many=True, read_only=True)
    pronounces_details = PronounceSerializer(source='pronounces', many=True, read_only=True)

    class Meta:
        model = Word
        fields = ('id', 'word', 'language', 'translations_details', 'pronounces_details', 'translations', 'pronounces')
