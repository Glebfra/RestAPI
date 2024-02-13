from rest_framework import serializers
from .models import *


class BaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = None
        fields = '__all__'
        read_only_fields = []

    def create(self, validated_data):
        model = self.Meta.model(**validated_data)
        model.save()
        return model


class LanguageSerializer(BaseSerializer):
    class Meta:
        model = Language
        fields = '__all__'
        read_only_fields = ['id']

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance


class WordSerializer(BaseSerializer):
    class Meta:
        model = Words
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'count']

    def update(self, instance, validated_data):
        instance.russian = validated_data.get('russian', instance.russian)
        instance.japanese = validated_data.get('japanese', instance.japanese)
        instance.save()
        return instance
