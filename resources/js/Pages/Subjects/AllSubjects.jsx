import { router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'


const AllSubjects = ({ subjects }) => {
    const { t } = useTranslation()

    console.log(subjects)
    return (
        <div className='flex flex-col w-full items-center pt-20'>
            {subjects.map((subject) => <li
                key={subject.id}
                className='flex text-gray-800 flex-row cursor-pointer w-80 justify-between items-center font-semibold text-xl hover-underline-animation'

            >
                {subject.name}
                <img
                    src={subject.image}
                    alt={subject.name}
                    className="max-w-20 rounded-md"
                />
            </li>)}
            {subjects.length < 1 && <span>Za izabrani jezik nema predmeta</span>}
        </div>
    )
}

export default AllSubjects
