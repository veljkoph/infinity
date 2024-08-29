import { Link } from '@inertiajs/react'
import React from 'react'
import { usePage } from '@inertiajs/react'

import logo from '../../assets/infinity.png';
import { useTranslation } from 'react-i18next';


const Header = () => {


    const { url, component } = usePage()
    const { i18n, t } = useTranslation()

    return (
        <header className="w-full text-gray-700 bg-slate-100 border-t border-gray-100 shadow-sm body-font">
            <div className="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
                <nav className="flex flex-wrap gap-4 items-center text-base lg:w-2/5 md:ml-auto">
                    <Link
                        href={route('subjects.home', { slug: i18n.language })}
                        className={url.startsWith('/subjects') ? 'text-m  text-gray-600 hover:text-gray-900 underline' : '  text-gray-600 hover:text-gray-900 hover:underline'}

                    >
                        {t('subjects')}
                    </Link>


                </nav>
                <a
                    className="flex items-center order-first mb-4 font-medium text-gray-900 lg:order-none lg:w-1/5 title-font lg:items-center lg:justify-center md:mb-0">
                    <img src={logo} className='h-8' />
                </a>


                <div className="inline-flex items-center h-full ml-5  gap-2 lg:w-2/5 lg:justify-end lg:ml-0">
                    <Link
                        href={route('subjects.languages')}


                    >


                        {(i18n.language == 'sr' || i18n.language == 'sr_cir') && <img
                            src={`${import.meta.env.VITE_APP_BASE_URL}/storage/serbia.png`}
                            alt={i18n.language}
                            className="max-w-10 rounded-md"
                        />}
                        {i18n.language == 'hr' && <img
                            src={`${import.meta.env.VITE_APP_BASE_URL}/storage/croatia.png`}
                            alt={i18n.language}
                            className="max-w-10 rounded-md"
                        />}
                        {(i18n.language == 'slo') && <img
                            src={`${import.meta.env.VITE_APP_BASE_URL}/storage/slovenia.png`}
                            alt={i18n.language}
                            className="max-w-10 rounded-md"
                        />}
                    </Link>
                    <a
                        href="http://127.0.0.1:8000/admin/login"

                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>

                    </a>
                </div>
            </div>
        </header >
    )
}

export default Header
