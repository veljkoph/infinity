import React from 'react';
import { useTranslation } from 'react-i18next';
import { router } from '@inertiajs/react'
import TalkingAnimation from '@/Components/Global/TalkingAnimation';
import BackgroudNature from '@/Components/Global/BackgroudNature';

const LanguageSelector = ({ languages }) => {

    const { t, i18n } = useTranslation();


    const changeLanguageHandler = (lang) => {
        i18n.changeLanguage(lang.slug)
        localStorage.setItem('lang', lang.slug);
        router.visit(`/subjects/${lang.id}`);
    }

    return (
        <div className='w-full gap-8 flex flex-col p-12 relative'>
            <BackgroudNature />
            <div className='absolute'>
                <TalkingAnimation />
            </div>
            <ul className='flex flex-col items-center gap-4'>
                {languages?.map((lang) => (
                    <li
                        key={lang.id}
                        className='flex text-gray-800 flex-row cursor-pointer w-80 justify-between items-center font-semibold text-xl hover-underline-animation'
                        onClick={() => changeLanguageHandler(lang)}
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
