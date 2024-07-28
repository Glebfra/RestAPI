from django.contrib import admin

from .models import *


@admin.register(Words)
class WordsAdmin(admin.ModelAdmin):
    list_display = ('word', 'language',)
    search_fields = ('word', 'language',)
    list_filter = ('language',)


@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
