from django.contrib import admin

from .models import Language, Words

# Register your models here.
admin.site.register(Words)
admin.site.register(Language)
