from django.contrib import admin

from .models import *


@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    search_fields = ('name', 'code')
    list_display = ('name', 'code')


@admin.register(Word)
class WordAdmin(admin.ModelAdmin):
    search_fields = ('word', 'language__name', 'language__code')
    list_display = ('word', 'language')
    list_filter = ('language__name',)


@admin.register(WordPronounce)
class WordPronounce(admin.ModelAdmin):
    search_fields = ('pronounce',)
    list_display = ('pronounce',)
