from django.urls import path

from .views import *


urlpatterns = [
    path('words/', APIWordsViewSet.as_view()),
    path('languages/', APILanguagesViewSet.as_view()),
]
