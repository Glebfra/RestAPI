from django.db import models


class Language(models.Model):
    name = models.CharField(max_length=255, unique=True)

    class Meta:
        verbose_name = 'Язык'
        verbose_name_plural = 'Языки'

    def __str__(self):
        return self.name


class Words(models.Model):
    word = models.CharField(max_length=255, verbose_name='Слово', unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    language = models.ForeignKey(Language, on_delete=models.CASCADE, verbose_name='Язык')

    translations = models.ManyToManyField('self', verbose_name='Перевод', symmetrical=True, blank=True)
    users = models.ManyToManyField('authentication.User', verbose_name='Слова пользователей', symmetrical=True, blank=True)

    class Meta:
        verbose_name = 'Слово'
        verbose_name_plural = 'Слова'

    def __str__(self):
        return self.word
