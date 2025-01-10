import BackgroudNature from '@/Components/Global/BackgroudNature';
import { Link, router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'


const SubjectsHome = ({ subjects }) => {
    const { t } = useTranslation()


    return (
        <div className='flex  flex-col w-full items-center pt-12 relative flex-grow '>
            <BackgroudNature />
            {subjects.map((subject) =>
                <Link key={subject.id} href={route('lessons.home', { id: subject.id, lang: 'sr' })}>

                    <li
                        className='flex text-gray-800 flex-row cursor-pointer w-80 justify-between items-center font-semibold text-xl hover-underline-animation'

                    >
                        {subject.name}
                        <img
                            src={`${import.meta.env.VITE_APP_BASE_URL}/images/${subject.image}`}
                            alt={subject.name}
                            className="max-w-20 rounded-md"
                        />
                    </li>          </Link>)}
            {subjects.length < 1 && <span>Za izabrani jezik nema predmeta</span>}
        </div>
    )
}

export default SubjectsHome
