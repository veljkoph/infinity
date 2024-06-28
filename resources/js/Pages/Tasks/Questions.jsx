import React, { useRef, useState } from 'react'

const Questions = ({ task }) => {

    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false)

    const playAudio = () => {
        if (audioRef.current) {
            setIsPlaying(true)
            audioRef.current.play();
        }
    };

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



            <ul className='grid w-full grid-cols-2 gap-2 justify-center items-center pt-20'>
                {task.answers.map((answer, index) => (
                    <li key={index} className='flex items-center  w-full justify-center h-20 border bg-white shadow-sm border-gray-300 rounded-md transition-colors duration-500 ease-in-out hover:bg-lightBlue'>
                        {answer.text}
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default Questions
