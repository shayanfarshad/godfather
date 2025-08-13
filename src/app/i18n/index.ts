
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import fa from './locales/fa/common.json';
import en from './locales/en/common.json';

const fallback = 'fa';
const deviceLang = RNLocalize.getLocales?.()[0]?.languageCode ?? fallback;

i18n.use(initReactI18next).init({
    resources: { fa: { common: fa }, en: { common: en } },
    lng: deviceLang === 'fa' ? 'fa' : 'en',
    fallbackLng: fallback,
    ns: ['common'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
});

export default i18n;