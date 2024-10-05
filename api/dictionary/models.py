from typing import Self

from django.db import models

from authentication.models import User


class Language(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=4)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if name := getattr(self, 'name', False):
            setattr(self, 'name', name.capitalize())
        if code := getattr(self, 'code', False):
            setattr(self, 'code', code.lower())
        super(Language, self).save(*args, **kwargs)


class WordPronounce(models.Model):
    pronounce = models.CharField(max_length=255)

    def __str__(self):
        return self.pronounce


class Word(models.Model):
    word = models.CharField(max_length=255)
    pronounces = models.ManyToManyField(WordPronounce, related_name='words', blank=True)
    translations = models.ManyToManyField('self', symmetrical=True, blank=True)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    users = models.ManyToManyField(User, related_name='words', symmetrical=True, blank=True)

    def __str__(self) -> str:
        return self.word

    def save(self, *args, **kwargs) -> None:
        if word := getattr(self, 'word', False):
            setattr(self, 'word', word.capitalize())
        super(Word, self).save(*args, **kwargs)

    def add_translation(self, translation: Self) -> None:
        self.translations.add(translation)

    def remove_translation(self, translation: Self) -> None:
        self.translations.remove(translation)
