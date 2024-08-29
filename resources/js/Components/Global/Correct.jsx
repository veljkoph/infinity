import React from 'react'
import bravoAnimation from '../../Animations/bravo.json'
import Lottie from "lottie-react";
import { useTranslation } from 'react-i18next';
import { router } from '@inertiajs/react';

const Correct = ({ hasNextTask, exerciseId }) => {
    const { t } = useTranslation()
    const style = {
        height: 300,
    };
    return (
        <div className="fixed animate-fadeIn z-50 inset-0 flex items-center justify-center overflow-hidden ">
            <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">


                    <Lottie style={style} animationData={bravoAnimation} loop={1} />
                    <h3 className="text-lg uppercase leading-6 font-medium text-center text-gray-900">
                        {hasNextTask ? t('bravo') : t('finishedExercise')}
                    </h3>
                </div>
                {!hasNextTask && <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                        onClick={() => router.visit(`/exercises/${exerciseId}`)}
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"

                    >
                        {t('proceed')}
                    </button>
                </div>}
            </div>
        </div>
    )
}


export default Correct
