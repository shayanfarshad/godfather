// import * as Localization from "expo-localization"
import * as localization from 'react-native-localize';
import i18n from 'i18n-js';
import {I18nManager} from 'react-native';

// if English isn't your default language, move Translations to the appropriate language file.
import en, {Translations} from './en';
import fa from './fa';

i18n.fallbacks = true;
// i18next.init({
//   fallbackLng: ['en', 'fa', 'en-IR', 'en-US'],
// });

/**
 * we need always include "*-US" for some valid language codes because when you change the system language,
 * the language code is the suffixed with "-US". i.e. if a device is set to English ("en"),
 * if you change to another language and then return to English language code is now "en-US".
 */

i18n.translations = {fa, 'en-IR': fa, en, 'en-US': en};
// export const loadLocale = async () => {
//   for (const locale of localization.getLocales()) {
//     if (i18n.translations[locale.languageCode] !== null) {
//       console.log({locale});
//       switch (locale.countryCode) {
//         case 'US':
//           import('./en.ts').then(en => {
//             i18n.translations = {en};
//           });
//           break;
//         default:
//         case 'IR':
//           import('./fa.ts').then(fa => {
//             i18n.translations = {fa};
//           });
//           break;
//       }
//       break;
//     }
//   }
// };
const locales = localization.getLocales();

i18n.locale = localization.getLocales()[0].languageTag;

export const changeLang = (lang: string) => {
  if (lang === 'en-US') {
    // I18nManager.allowRTL(false);
    I18nManager.forceRTL(true);
  } else {
    // I18nManager.allowRTL(true);
    I18nManager.forceRTL(false);
  }
  if (lang) {
    i18n.locale = lang;
  } else if (Array.isArray(locales)) {
    i18n.locale = locales[0].languageTag;
  }
};
// handle RTL languages
// export const isRTL = localization.getLocales()[0].languageTag;
// console.log({isRTL})
// I18nManager.allowRTL(isRTL === 'en-IR');
// I18nManager.forceRTL(isRTL === 'en-IR');

/**
 * Builds up valid keypaths for translations.
 */
export type TxKeyPath = RecursiveKeyOf<Translations>;

// via: https://stackoverflow.com/a/65333050
type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `${TKey}`
  >;
}[keyof TObj & (string | number)];

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `['${TKey}']` | `.${TKey}`
  >;
}[keyof TObj & (string | number)];

type RecursiveKeyOfHandleValue<
  TValue,
  Text extends string,
> = TValue extends any[]
  ? Text
  : TValue extends object
  ? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
  : Text;
