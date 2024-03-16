from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import APILanguagesViewSet, APIUserWordsViewSet, APIWordsViewSet


urlpatterns = [
    path('words/', APIWordsViewSet.as_view()),
    path('account/words/', APIUserWordsViewSet.as_view()),

    path('languages/', APILanguagesViewSet.as_view()),
]
