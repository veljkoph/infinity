import Correct from '@/Components/Global/Correct';
import React, { useRef, useState } from 'react'

const Questions = ({ task }) => {

    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false)
    const [isFinished, setIsFinished] = useState(false)
    const [wrongAnswerIndices, setWrongAnswerIndices] = useState([]);
    console.log(wrongAnswerIndices)
    const playAudio = () => {
        if (audioRef.current) {
            setIsPlaying(true)
            audioRef.current.play();
        }
    };
    const correctAnswerHandler = (index, answer) => {

        if (answer.isTrue) {
            setIsFinished(true)
        }
        if (!answer.isTrue && !wrongAnswerIndices.includes(index)) {
            setWrongAnswerIndices([...wrongAnswerIndices, index]);
        }
        return
    }

    return (
        <div className='flex flex-col p-10 bg-slate-200 w-full gap-4 relative'>
            <h1 className='text-center font-semibold text-2xl'>{task.title}</h1>
            <span className='text-center font-semibold text-xl'>{task.question}</span>
            <audio ref={audioRef} src={`${import.meta.env.VITE_APP_BASE_URL}/storage/${task.audio}`} />
            <button className='absolute bg-white p-2 rounded-2xl right-20' onClick={playAudio}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                </svg>
            </button>
            {isFinished && <Correct />}
            {
                !task.answers[0].image ?
                    <ul className='grid grid-cols-2 gap-5 justify-center items-center mx-auto my-auto '>
                        {task.answers.map((answer, index) => (
                            <li onClick={() => correctAnswerHandler(index, answer)} key={index} className={`flex flex-col items-center justify-center cursor-pointer rounded-md bg-white transform transition-transform duration-300 hover:scale-105 ${wrongAnswerIndices.includes(index) ? 'animate-borderFadeIn inset-0' : 'border-2 '}`}>
                                <img
                                    src={`${import.meta.env.VITE_APP_BASE_URL}/storage/${answer.image}`}
                                    alt={answer.name}
                                    className="w-36 h-36 object-cover bg-white rounded-md "
                                />
                                <span className='text-xl font-bold mb-2'> {answer.text}</span>
                            </li>
                        ))}
                    </ul> :
                    <ul className='grid w-full grid-cols-2 gap-4 justify-center items-center pt-20'>
                        {task.answers.map((answer, index) => (
                            <li onClick={() => correctAnswerHandler(index, answer)} key={index} className={`flex items-center  w-full justify-center h-20  bg-white shadow-sm  rounded-md transition-colors duration-500 ease-in-out cursor-pointer ${wrongAnswerIndices.includes(index) ? 'animate-borderFadeIn inset-0' : 'border-2  border-transparent'}`}>
                                {answer.text}
                            </li>

                        ))}
                    </ul>
            }

        </div>
    )
}

export default Questions
