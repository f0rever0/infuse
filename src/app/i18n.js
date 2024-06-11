import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import langEn from "./locales/en.json";
import langKo from "./locales/ko.json";

const resources = {
  en: {
    translation: langEn,
  },
  ko: {
    translation: langKo,
  },
};

const getInitialLanguage = () => {
  const localStorageLang = localStorage.getItem("i18nextLng");
  if (localStorageLang) {
    return localStorageLang;
  } else {
    const browserLang = navigator.language || navigator.userLanguage;
    localStorage.setItem("i18nextLng", browserLang);
    return browserLang;
  }
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
