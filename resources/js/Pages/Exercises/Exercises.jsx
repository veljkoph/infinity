import BackgroudNature from '@/Components/Global/BackgroudNature';
import Empty from '@/Components/Global/Empty';
import { Link, router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'


const Exercises = ({ exercises }) => {

    const { t } = useTranslation()

    return (
        <div className='flex flex-col w-full items-center pt-12 relative bg-lightBlue pb-12'>
            {/* <BackgroudNature /> */}
            <div className="grid grid-cols-2 gap-16">
                {exercises?.map((exercise) =>
                    exercise.firstTaskId ? <Link key={exercise.id} href={route('tasks.home', { id: exercise.firstTaskId, lang: 'sr' })}>
                        <li
                            key={exercise.id}
                            className='flex text-gray-800 bg-white relative px-8 py-4 rounded-xl flex-row cursor-pointer w-80 justify-between items-center font-semibold text-xl transform transition-transform duration-300 hover:bg-slate-50 hover:scale-105'

                        >
                            <span className='font-bold text-xl'>    {exercise.name}  </span>
                            <img
                                src={`${import.meta.env.VITE_APP_BASE_URL}/storage/${exercise.image}`}
                                alt={exercise.name}
                                className="max-w-20 rounded-md "
                            />
                        </li></Link> : <li
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
            {exercises.length < 1 && <Empty text={t('noExercises')} />}
        </div >
    )
}

export default Exercises
