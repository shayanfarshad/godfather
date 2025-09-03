import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import fa from "./locales/fa/common.json";
import en from "./locales/en/common.json";


// i18n.use(initReactI18next).init({
//     compatibilityJSON: "v4",
//     resources: {
//         en: { common: en },
//         fa: { common: fa },

//     },
//     lng: "fa",
//     ns: ["common"],  // مقدار ابتدایی فقط برای اولین بار
//     fallbackLng: "fa",
//     interpolation: {
//         escapeValue: false,
//     },
// });


i18n.use(initReactI18next).init({
    resources: { fa: { common: fa }, en: { common: en } },
    lng: 'fa',                 // مقدار ابتدایی فقط برای اولین بار
    fallbackLng: 'fa',
    ns: ["common"],

    defaultNS: 'common',
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
});

export default i18n;