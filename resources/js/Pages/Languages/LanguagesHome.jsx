import React from 'react';
import { useTranslation } from 'react-i18next';
import { router } from '@inertiajs/react'

const LanguageSelector = ({ languages }) => {

    const { t, i18n } = useTranslation();

    const changeLanguageHandler = (lang) => {
        i18n.changeLanguage(lang)
        router.visit(`/subjects/${i18n.language}`);
    }

    return (
        <div className='w-full min-h-96 gap-8 flex flex-col p-20'>
            <h1 className='text-xl font-bold text-gray-800 text-center'>{t('chooseLanguage')}</h1>
            <ul className='flex flex-col items-center gap-8'>
                {languages?.map((lang) => (
                    <li
                        key={lang.id}
                        className='flex text-gray-800 flex-row cursor-pointer w-80 justify-between items-center font-semibold text-xl hover-underline-animation'
                        onClick={() => changeLanguageHandler(lang.slug)}
                    >
                        {lang.name}
                        <img
                            src={`${import.meta.env.VITE_APP_BASE_URL}/storage/${lang.image}`}
                            alt={lang.name}
                            className="max-w-20 rounded-md"
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LanguageSelector;
