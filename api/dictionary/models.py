from django.db import models


class Language(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        verbose_name = 'Язык'
        verbose_name_plural = 'Языки'

    def __str__(self):
        return self.name


# Create your models here.
class Words(models.Model):
    russian = models.CharField(max_length=255, verbose_name='Русский')
    japanese = models.CharField(max_length=255, verbose_name='Японский')
    count = models.IntegerField(default=0, verbose_name='Количество правильных ответов')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Слово'
        verbose_name_plural = 'Слова'

    def __str__(self):
        return f'{self.japanese}: {self.russian}'
