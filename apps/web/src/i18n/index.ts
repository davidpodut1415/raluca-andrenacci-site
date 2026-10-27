import { DEFAULT_LOCALE } from '@raluca/shared';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCommon from './locales/en/common.json';
import enConsent from './locales/en/consent.json';
import enPages from './locales/en/pages.json';
import itCommon from './locales/it/common.json';
import itConsent from './locales/it/consent.json';
import itPages from './locales/it/pages.json';
import roCommon from './locales/ro/common.json';
import roConsent from './locales/ro/consent.json';
import roPages from './locales/ro/pages.json';
import { localeFromPath } from './routes';

void i18n.use(initReactI18next).init({
  resources: {
    ro: { common: roCommon, consent: roConsent, pages: roPages },
    en: { common: enCommon, consent: enConsent, pages: enPages },
    it: { common: itCommon, consent: itConsent, pages: itPages },
  },
  lng: localeFromPath(window.location.pathname),
  fallbackLng: DEFAULT_LOCALE,
  ns: ['common', 'consent', 'pages'],
  defaultNS: 'common',
  interpolation: { escapeValue: false },
});

export default i18n;
