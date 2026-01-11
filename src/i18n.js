import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationAR from "./locales/ar.json";
import translationENG from "./locales/en.json";

// the translations
const resources = {
  en: {
    translation: translationENG,
  },
  ar: {
    translation: translationAR,
  },
};

const language = localStorage.getItem("I18N_LANGUAGE");

if (!language) {
  localStorage.setItem("I18N_LANGUAGE", "ar");
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem("I18N_LANGUAGE") || "ar",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      useSuspense: false,
    },
    // lng: document.querySelector("html").lang,
    // fallbackLng: "en",
    supportedLngs: ["ar", "en"],
    // detection: options,
    backend: {
      loadPath: "./locales/{{lng}}/translation.json",
      // loadPath: './locales/{{lng}}/translation.json'
    },
    // keySeparator: false, // we do not use keys in form messages.welcome
    // react: {
    // 	useSuspense: false
    // },
  });

export default i18n;
