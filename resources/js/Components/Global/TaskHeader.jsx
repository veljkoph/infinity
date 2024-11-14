import { router } from '@inertiajs/react'
import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'



const TaskHeader = ({ task }) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef(null);

    const playAudio = () => {
        if (audioRef.current) {
            setIsPlaying(true)
            audioRef.current.play();
        }
    }

    const skiptaskHandler = () => {

        if (task.nextTaskId) {
            router.visit(`/task/${task.nextTaskId}`)
        } else {
            router.visit(`/exercises/${task.lessonId}`)
        }

    }
    return (
        <div className='flex  flex-row justify-between items-center bg-slate-100 p-5 min-h-12 w-full '>
            <span className='text-center  text-l font-bold'>{task.title}</span>
            <div className='flex flex-row gap-2'>
                {task.sound && <audio ref={audioRef} src={`${import.meta.env.VITE_APP_BASE_URL}/storage/${task.sound}`} />}
                {task.sound && <button onClick={playAudio} className='bg-red-400 text-white p-1 rounded-md'> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                </svg>
                </button>}
                <button onClick={skiptaskHandler} className='bg-red-400 text-white p-1 rounded-md'> {task.nextTaskId ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
                </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                }
                </button>
            </div>

        </div>
    )
}

export default TaskHeader
