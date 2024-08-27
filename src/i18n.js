import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend) // Используем i18next-http-backend для загрузки переводов
  .use(initReactI18next) // передаем инстанс в react-i18next
  .init({
    lng: 'pl', // язык по умолчанию
    fallbackLng: 'pl', // язык, если перевод не найден
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // Путь к JSON-файлам с переводами
    },
    interpolation: {
      escapeValue: false, // react уже экранирует значения
    },
  });

export default i18n;
