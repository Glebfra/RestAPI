from rest_framework import serializers
from rest_framework.response import Response

from .models import User


class RegistrationSerializer(serializers.ModelSerializer):
    new_password = serializers.CharField(max_length=255, write_only=True, required=False)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name', 'new_password']

    def create(self, validated_data):
        user = self.Meta.model.objects.create_user(**validated_data)
        user.save()
        return user

    def update(self, instance, validated_data):
        if not instance.check_password(validated_data.get('password')):
            raise ValueError('Invalid password')
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.set_password(validated_data.get('new_password', instance.password))
        instance.save()
        return instance
