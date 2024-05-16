from django.urls import path

from .views import APILanguagesViewSet, APIUserWordsViewSet, APIWordsViewSet

urlpatterns = [
    path('words/', APIWordsViewSet.as_view()),
    path('words/<int:pk>/', APIWordsViewSet.as_view()),
    path('languages/', APILanguagesViewSet.as_view()),
    path('account/words/', APIUserWordsViewSet.as_view()),
    path('account/words/<int:pk>/', APIUserWordsViewSet.as_view()),
]
