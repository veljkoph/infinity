import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translation_en from './translation_en';
import translation_sr from './translation_sr';
import translation_srcir from './translation_srcir';
import translation_slo from './translation_slo';
import translation_hr from './translation_hr';

const getInitialLanguage = () => {
    const savedLanguage = localStorage.getItem('lang');
    return savedLanguage || 'sr';
};
i18n.use(initReactI18next)
    .init({
        resources: {
            en: translation_en,
            sr: translation_sr,
            sr_cir: translation_srcir,
            slo: translation_slo,
            hr: translation_hr
        },
        fallbackLng: getInitialLanguage(),
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
