from rest_framework import serializers

from .models import Element, Phase, Saturation, State


class BaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = None
        fields = '__all__'
        read_only_fields = []

    def create(self, validated_data):
        model = self.Meta.model(**validated_data)
        model.save()
        return model


class ElementSerializer(BaseSerializer):
    class Meta:
        model = Element
        fields = '__all__'
        read_only_fields = ['user', 'created_at']

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.symbol = validated_data.get('symbol', instance.symbol)
        instance.save()
        return instance


class StateSerializer(BaseSerializer):
    class Meta:
        model = State
        fields = '__all__'
        read_only_fields = ['user', 'created_at']

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.symbol = validated_data.get('symbol', instance.symbol)
        instance.save()
        return instance


class PhaseSerializer(BaseSerializer):
    class Meta:
        model = Phase
        fields = '__all__'
        read_only_fields = ['user', 'created_at']

    def update(self, instance, validated_data):
        instance.temperature = validated_data.get('temperature', instance.temperature)
        instance.pressure = validated_data.get('pressure', instance.pressure)
        instance.density = validated_data.get('density', instance.density)
        instance.element = validated_data.get('element', instance.element)
        instance.save()
        return instance


class SaturationSerializer(BaseSerializer):
    class Meta:
        model = Saturation
        fields = '__all__'
        read_only_fields = ['user', 'created_at']

    def update(self, instance, validated_data):
        instance.temperature = validated_data.get('temperature', instance.temperature)
        instance.pressure = validated_data.get('pressure', instance.pressure)
        instance.density = validated_data.get('density', instance.density)
        instance.element = validated_data.get('element', instance.element)
        instance.save()
        return instance
