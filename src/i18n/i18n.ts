import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import fa from "./translations/fa.json";
import en from "./translations/en.json";


i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources: {
    en: { translation: en },
    fa: { translation: fa },
   
  },

  fallbackLng: "fa",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
