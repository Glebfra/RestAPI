from django.db import models
from django.conf import settings


User = settings.AUTH_USER_MODEL


class Language(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def save(self, *args, **kwargs):
        name: str = getattr(self, 'name', False)
        if name:
            setattr(self, 'name', name.capitalize())
        super(Language, self).save(*args, **kwargs)

    class Meta:
        verbose_name = 'Язык'
        verbose_name_plural = 'Языки'

    def __str__(self):
        return self.name


class Words(models.Model):
    word = models.CharField(max_length=255, verbose_name='Слово', null=True, unique=True)
    translations = models.ManyToManyField('self', verbose_name='Перевод', symmetrical=True, blank=True)
    language = models.ForeignKey(Language, on_delete=models.CASCADE, verbose_name='Язык', null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    users = models.ManyToManyField(User, verbose_name='Слова пользователей', related_name='words', symmetrical=True, null=True, blank=True)

    def save(self, *args, **kwargs):
        word: str = getattr(self, 'word', False)
        if word:
            setattr(self, 'word', word.capitalize())
        super(Words, self).save(*args, **kwargs)

    class Meta:
        verbose_name = 'Слово'
        verbose_name_plural = 'Слова'

    def __str__(self):
        return self.word
