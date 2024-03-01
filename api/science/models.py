from django.db import models
from django.conf import settings


User = settings.AUTH_USER_MODEL


# Create your models here.
class Element(models.Model):
    name = models.CharField(max_length=255)
    symbol = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)

    class Meta:
        verbose_name = 'Элемент'
        verbose_name_plural = 'Элементы'

    def __str__(self):
        return self.name


class State(models.Model):
    name = models.CharField(max_length=255)
    symbol = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)

    class Meta:
        verbose_name = 'Состояние'
        verbose_name_plural = 'Состояния'

    def __str__(self):
        return self.name


class Phase(models.Model):
    temperature = models.FloatField()
    pressure = models.FloatField()
    density = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    element = models.ForeignKey(Element, on_delete=models.PROTECT)
    state = models.ForeignKey(State, on_delete=models.PROTECT)
    user = models.ForeignKey(User, on_delete=models.PROTECT)

    class Meta:
        verbose_name = 'Фаза'
        verbose_name_plural = 'Фаза'

    def __str__(self):
        return str(self.element)


class Saturation(models.Model):
    temperature = models.FloatField()
    pressure = models.FloatField()
    density = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    element = models.ForeignKey(Element, on_delete=models.PROTECT)
    user = models.ForeignKey(User, on_delete=models.PROTECT)

    class Meta:
        verbose_name = 'Линия насыщения'
        verbose_name_plural = 'Линия насыщения'

    def __str__(self):
        return str(self.element)
