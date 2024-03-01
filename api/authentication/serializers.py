from rest_framework import serializers

from .models import User


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name']

    def create(self, validated_data):
        user = self.Meta.model.objects.create_user(**validated_data)
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=255, write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'password']

    def create(self, validated_data):
        user = self.Meta.model.objects.create_user(**validated_data)
        user.save()
        return user
