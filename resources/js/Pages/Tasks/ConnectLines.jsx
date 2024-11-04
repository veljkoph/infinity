import ConnectableQuestion from "@/Components/Tasks/ConnectableQuestion";
import React, { useRef } from "react";
import { useState } from "react";
import Xarrow, { Xwrapper } from "react-xarrows";

const boxStyle = { border: "grey solid 2px", borderRadius: "10px", padding: "5px" };

const ConnectLines = ({ task }) => {
    console.log(task)
    const box1Ref = useRef(null);
    const [selectedElement, setSelectedElement] = useState(null)
    const [pairs, setPairs] = useState([{ start: '5694cf6b-967e-4bf5-ba6e-9006519d7dd3', end: '03fdb6ef-8aad-4c91-b832-b061570c04fb' }])

    return (
        <div className='flex flex-1 flex-row bg-lightBlue justify-center items-center w-100 gap-48'>
            <div className='flex flex-col gap-20'>
                {task.answers.map((item) => <ConnectableQuestion key={item.id} id={item.question.id} item={item} setPairs={setPairs} selectedElement={selectedElement} setSelectedElement={setSelectedElement} />)}

            </div>
            <div className='flex flex-col gap-20'>
                {task.answers.map((item) => <ConnectableQuestion id={item.answer.id} item={item} setPairs={setPairs} selectedElement={selectedElement} setSelectedElement={setSelectedElement} />)}
            </div>

            {pairs.map((pair) => <Xarrow key={pair.start} start={pair.start} end={pair.end} />)}
        </div>
    );
}

export default ConnectLines;
