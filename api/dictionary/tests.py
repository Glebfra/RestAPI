from django.test import TestCase

from dictionary.models import Language, Word


# Create your tests here.
class WordTest(TestCase):
    word_id: int

    def setUp(self):
        self.language = Language.objects.create(name='Russian', code='ru')
        self.word_id = Word.objects.create(word='река', language=self.language).pk

    def test_word_capitalize(self):
        word = Word.objects.get(pk=self.word_id)
        self.assertEqual(word.word, 'Река')


class LanguageTest(TestCase):
    language_id: int

    def setUp(self):
        self.language_id = Language.objects.create(name='Russian', code='Ru').pk

    def test_language_lower(self):
        language = Language.objects.get(pk=self.language_id)
        self.assertEqual(language.code, 'ru')
