import TaskHeader from '@/Components/Global/TaskHeader'
import React from 'react'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import DragCard from '@/Components/DNDTask/Card'
import DropZone from '@/Components/DNDTask/DropZone'
import { useState } from 'react'
import { useEffect } from 'react'
import Correct from '@/Components/Global/Correct'
import { router } from '@inertiajs/react'


const DragNDrop = ({ task }) => {
    const [correctDrops, setCorrectDrops] = useState([]);
    const [shuffledAnswers, setShuffledAnswers] = useState([]);


    useEffect(() => {
        const shuffled = [...task.answers]
            .map((item) => ({ ...item, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort);
        setShuffledAnswers(shuffled);
    }, [task.answers]);


    const handleDropSuccess = (id) => {
        setCorrectDrops((prev) => {
            if (!prev.includes(id)) {
                return [...prev, id];
            }
            return prev;
        });
    };

    useEffect(() => {
        if (correctDrops.length === task.answers.length) {
            task.nextTaskId && setTimeout(() => router.visit(`/task/${task.nextTaskId}`), 1000)
        }
    }, [correctDrops])

    return (
        <div className='flex flex-col bg-slate-200 w-full relative fade-in'>
            <TaskHeader task={task} />
            <DndProvider backend={HTML5Backend} >
                <div className="flex flex-row  w-full  p-4">
                    {task.answers.map((item, index) => (
                        <div key={item.id} className="absolute transition-transform duration-300" >
                            <DragCard correctDrops={correctDrops} item={item} handleDropSuccess={handleDropSuccess} />
                        </div>
                    ))}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-4 w-50 ml-auto">
                        {shuffledAnswers.map((item) => (
                            <DropZone key={item.id} dropItem={item} />
                        ))}
                    </div>
                </div >
                {correctDrops.length === task.answers.length && <Correct hasNextTask={task.nextTaskId} lessonId={task.lessonId} />}
            </DndProvider >
        </div >
    )
}

export default DragNDrop
