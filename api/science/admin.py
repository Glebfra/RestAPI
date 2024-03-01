from django.contrib import admin

from .models import Element, Phase, Saturation, State


@admin.register(Element)
class ElementAdmin(admin.ModelAdmin):
    list_display = ('name', 'symbol', 'user', 'created_at')
    search_fields = ('name', 'symbol')


@admin.register(State)
class StateAdmin(admin.ModelAdmin):
    list_display = ('name', 'symbol', 'user', 'created_at')
    search_fields = ('name', 'symbol')


@admin.register(Phase)
class PhaseAdmin(admin.ModelAdmin):
    list_display = ('temperature', 'pressure', 'density', 'element', 'user', 'created_at')
    search_fields = ('element__name', 'element__symbol')


@admin.register(Saturation)
class SaturationAdmin(admin.ModelAdmin):
    list_display = ('temperature', 'pressure', 'density', 'element', 'user', 'created_at')
    search_fields = ('element__name', 'element__symbol')
