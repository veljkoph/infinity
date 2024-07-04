import { router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'


const LessonsHome = ({ lessons }) => {
    const { t } = useTranslation()

    console.log(lessons)
    return (
        <div className='flex flex-col w-full items-center pt-12 relative'>
            <img src={`${import.meta.env.VITE_APP_BASE_URL}/storage/bg.jpg`} className='absolute bottom-0 top-0 opacity-50 left-0 w-screen-md object-cover' />
            {lessons.map((lesson) => <li
                key={lesson.id}
                className='flex text-gray-800 flex-row cursor-pointer w-80 justify-between items-center font-semibold text-xl hover-underline-animation'

            >
                {lesson.name}
                <img
                    src={`${import.meta.env.VITE_APP_BASE_URL}/storage/${lesson.image}`}
                    alt={lesson.name}
                    className="max-w-20 rounded-md"
                />
            </li>)}
            {lessons.length < 1 && <span>Za izabrani predmet nema lekcija</span>}
        </div>
    )
}

export default LessonsHome
