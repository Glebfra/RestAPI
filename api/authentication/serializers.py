from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=255, write_only=True)
    new_password = serializers.CharField(max_length=255, write_only=True, allow_blank=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'password', 'new_password', 'avatar']

    def create(self, validated_data):
        user = self.Meta.model.objects.create_user(**validated_data)
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        new_password = validated_data.pop('new_password', None)
        if instance.check_password(password) and new_password is not None:
            instance.set_password(new_password)
            instance.save()
        instance = super(UserSerializer, self).update(instance, validated_data)
        return instance
