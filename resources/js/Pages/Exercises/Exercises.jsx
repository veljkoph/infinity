import BackgroudNature from '@/Components/Global/BackgroudNature';
import { router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'


const Exercises = ({ exercises }) => {

    const { t } = useTranslation()


    return (
        <div className='flex flex-col w-full items-center pt-12 relative bg-lightBlue pb-12'>
            {/* <BackgroudNature /> */}
            <div className="grid grid-cols-2 gap-16">
                {exercises?.map((exercise) => <li
                    key={exercise.id}
                    className='flex text-gray-800 bg-white relative px-8 py-4 rounded-xl flex-row cursor-pointer w-80 justify-between items-center font-semibold text-xl transform transition-transform duration-300 hover:bg-slate-50 hover:scale-105'

                >
                    <span className='font-bold text-xl'>    {exercise.name}  </span>
                    <img
                        src={`${import.meta.env.VITE_APP_BASE_URL}/storage/${exercise.image}`}
                        alt={exercise.name}
                        className="max-w-20 rounded-md "
                    />
                </li>)}
            </div>
            {exercises.length < 1 && <span>Za izabranu lekciju nema vezbi</span>}
        </div >
    )
}

export default Exercises
