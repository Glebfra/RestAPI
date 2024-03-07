from rest_framework import serializers

from .models import *


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = '__all__'
        read_only_fields = ['id']

    def create(self, validated_data):
        model = self.Meta.model(**validated_data)
        model.save()
        return model


class TranslationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Words
        fields = ['id', 'word', 'language']
        read_only_fields = ['word', 'language']


class WordSerializer(serializers.ModelSerializer):
    translations_details = TranslationSerializer(many=True, read_only=True, source='translations')

    class Meta:
        model = Words
        fields = ['id', 'word', 'language', 'translations', 'translations_details']
        read_only_fields = ['id']

    def create(self, validated_data):
        model = self.Meta.model(**validated_data)
        model.save()
        return model

    def update(self, instance, validated_data):
        instance = super(WordSerializer, self).update(instance, validated_data)
        return instance
