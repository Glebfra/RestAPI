from django.db import models
from rest_framework.authtoken.admin import User


# Create your models here.
class Element(models.Model):
    name = models.CharField(max_length=255)
    symbol = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Элемент'
        verbose_name_plural = 'Элементы'

    def __str__(self):
        return self.name
