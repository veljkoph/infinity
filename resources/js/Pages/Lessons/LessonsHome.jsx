import BackgroudNature from '@/Components/Global/BackgroudNature';
import Empty from '@/Components/Global/Empty';
import { Link, router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'


const LessonsHome = ({ lessons }) => {
    const { t } = useTranslation()


    return (
        <div className='flex flex-col w-full items-center pt-12 relative'>
            <BackgroudNature />
            {lessons.map((lesson) =>
                <Link key={lesson.id} href={route('exercises.home', { id: lesson.id, lang: 'sr' })}>
                    <li
                        key={lesson.id}
                        className='flex text-gray-800 flex-row cursor-pointer w-80 justify-between items-center font-semibold text-xl hover-underline-animation'

                    >
                        {lesson.name}
                        <img
                            src={`${import.meta.env.VITE_APP_BASE_URL}/images/${lesson.image}`}
                            alt={lesson.name}
                            className="max-w-20 rounded-md"
                        />
                    </li> </Link>)}
            {lessons.length < 1 && <Empty text={t('noLessons')} />}
        </div>
    )
}

export default LessonsHome
