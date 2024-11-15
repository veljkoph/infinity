import ConnectableAnswer from "@/Components/Tasks/ConnectableAnswer";
import ConnectableQuestion from "@/Components/Tasks/ConnectableQuestion";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Xarrow, { Xwrapper } from "react-xarrows";
import { router } from '@inertiajs/react'
import Correct from "@/Components/Global/Correct";
import TaskContainer from "@/Components/Global/TaskContainer";

const ConnectLines = ({ task }) => {


    const [selectedElement, setSelectedElement] = useState(null)
    const [pairs, setPairs] = useState([])
    const [shuffledAnswers, setShuffledAnswers] = useState([]);

    useEffect(() => {
        const shuffled = [...task.answers].sort(() => Math.random() - 0.5);
        setShuffledAnswers(shuffled);
    }, [task.answers]);

    useEffect(() => {
        if (pairs.length === task.answers.length) {
            task.nextTaskId && setTimeout(() => router.visit(`/task/${task.nextTaskId}`), 1000)
        }
    }, [pairs])

    return (
        <TaskContainer task={task} className='bg-slate-200' >
            <div className='flex flex-1 flex-row  justify-center items-center w-100 gap-48 p-12 2xl:p-20'>
                <div className="flex flex-col justify-between h-full w-1/2 gap-6 2xl:gap-12">
                    {task.answers.map((item) => (
                        <ConnectableQuestion
                            pairs={pairs}
                            key={item.question.id}
                            id={item.question.id}
                            item={item}
                            setPairs={setPairs}
                            selectedElement={selectedElement}
                            setSelectedElement={setSelectedElement}
                        />
                    ))}
                </div>
                <div className="flex flex-col justify-between h-full w-1/2 gap-6 2xl:gap-12">
                    {shuffledAnswers.map((item) => (
                        <ConnectableAnswer
                            pairs={pairs}
                            key={item.answer.id}
                            id={item.answer.id}
                            item={item}
                            setPairs={setPairs}
                            selectedElement={selectedElement}
                            setSelectedElement={setSelectedElement}
                        />
                    ))}
                </div>
                {pairs.length === task.answers.length && <Correct hasNextTask={task.nextTaskId} lessonId={task.lessonId} />}
                {pairs.map((pair) => <Xarrow key={pair.start} start={pair.start} end={pair.end} />)}
            </div>
        </TaskContainer>
    );
}

export default ConnectLines;
