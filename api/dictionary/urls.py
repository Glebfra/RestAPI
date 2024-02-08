from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import APIWordsViewSet

router = DefaultRouter()
router.register('words', APIWordsViewSet)

urlpatterns = [
    path('', include(router.urls))
]
