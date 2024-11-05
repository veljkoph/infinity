import ConnectableAnswer from "@/Components/Tasks/ConnectableAnswer";
import ConnectableQuestion from "@/Components/Tasks/ConnectableQuestion";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Xarrow, { Xwrapper } from "react-xarrows";


const ConnectLines = ({ task }) => {


    const [selectedElement, setSelectedElement] = useState(null)
    const [pairs, setPairs] = useState([])
    const [shuffledAnswers, setShuffledAnswers] = useState([]);

    useEffect(() => {
        const shuffled = [...task.answers].sort(() => Math.random() - 0.5);
        setShuffledAnswers(shuffled);
    }, [task.answers]);

    return (
        <div className='flex flex-1 flex-row bg-lightBlue justify-center items-center w-100 gap-48'>
            <div className='flex flex-col gap-20'>
                {task.answers.map((item) => <ConnectableQuestion key={item.question.id} id={item.question.id} item={item} setPairs={setPairs} selectedElement={selectedElement} setSelectedElement={setSelectedElement} />)}

            </div>
            <div className='flex flex-col gap-20'>
                {shuffledAnswers.map((item) => <ConnectableAnswer key={item.answer.id} id={item.answer.id} item={item} setPairs={setPairs} selectedElement={selectedElement} setSelectedElement={setSelectedElement} />)}
            </div>

            {pairs.map((pair) => <Xarrow key={pair.start} start={pair.start} end={pair.end} />)}
        </div>
    );
}

export default ConnectLines;
