from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import APIElementsViewSet, APIPhasesViewSet, APISaturationsViewSet, APIStatesViewSet

router = DefaultRouter()
router.register('elements', APIElementsViewSet)
router.register('states', APIStatesViewSet)
router.register('phases', APIPhasesViewSet)
router.register('saturations', APISaturationsViewSet)

urlpatterns = [
    path('', include(router.urls))
]
