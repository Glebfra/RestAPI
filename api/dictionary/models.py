from django.conf import settings
from django.db import models

User = settings.AUTH_USER_MODEL


class Language(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=4)

    def __str__(self):
        return self.name


class Word(models.Model):
    word = models.CharField(max_length=255)
    pronounces = models.ManyToManyField('WordPronounce', related_name='words', blank=True)
    translations = models.ManyToManyField('self', symmetrical=True, blank=True)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.word


class WordPronounce(models.Model):
    pronounce = models.CharField(max_length=255)

    def __str__(self):
        return self.pronounce
