import React from 'react'
import bravoAnimation from '../../Animations/bravo.json'
import dogAnimation from '../../Animations/dog.json'
import Lottie from "lottie-react";
import { useTranslation } from 'react-i18next';
import { router } from '@inertiajs/react';
import { useEffect } from 'react';
const PASSABLE = 70
const ModalDraw = ({ setLines, hasNextTask, lessonId, result, similarity, setTextResult, nextTaskId }) => {

    const { t } = useTranslation()
    const style = {
        height: 300,
    };

    const restartHandler = () => {
        setTextResult(null)
        setLines([])
    }

    useEffect(() => {
        if (similarity > PASSABLE) {
            nextTaskId && setTimeout(() => router.visit(`/task/${nextTaskId}`), 1000)
        }

    }, [])

    return (
        <div className="fixed animate-fadeIn z-50 inset-0 flex items-center justify-center overflow-hidden ">
            <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                {similarity > PASSABLE ? <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                    <span className="text-lg uppercase leading-6 font-medium text-center text-gray-900">{t('youEntered')}: {result}</span>

                    <Lottie style={style} animationData={bravoAnimation} loop={1} />
                    <h3 className="text-lg uppercase leading-6 font-medium text-center text-gray-900">
                        {hasNextTask ? t('bravo') : t('finishedExercise')}
                    </h3>
                </div> : <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 text-center text-xl font-semibold" >   <Lottie style={style} animationData={dogAnimation} loop={1} /><span>{t('tryAgain')}</span></div>}
                {!hasNextTask && similarity > PASSABLE && <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                        onClick={() => router.visit(`/exercises/${lessonId}`)}
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"

                    >
                        {t('proceed')}
                    </button>
                </div>}
                {similarity < PASSABLE &&
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"> <button
                        onClick={restartHandler}
                        type="button"
                        className="w-full bg-green-500 p-2 rounded-md hover:bg-green-700 text-white font-bold"

                    >
                        {t('back')}
                    </button> </div>}
            </div>
        </div>
    )
}


export default ModalDraw
