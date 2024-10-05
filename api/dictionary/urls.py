from django.urls import path

from .views import *

urlpatterns = [
    path('words/', WordApiView.as_view(), name='word_api'),
    path('words/<int:pk>', WordDetailedApiView.as_view(), name='word_api_detailed'),
    path('words/user', UserWordApiView.as_view(), name='user_word_api'),
    path('pronounces/', PronounceCreateApiView.as_view(), name='pronounce_create_api'),
    path('pronounces/<str:word>', PronounceApiView.as_view(), name='pronounce_api'),
    path('languages/', LanguageApiView.as_view(), name='language_api'),
]
