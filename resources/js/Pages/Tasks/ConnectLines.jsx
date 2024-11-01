import ConnectableElement from "@/Components/Tasks/ConnectableElement";
import React, { useRef } from "react";
import { useState } from "react";
import Xarrow, { Xwrapper } from "react-xarrows";

const boxStyle = { border: "grey solid 2px", borderRadius: "10px", padding: "5px" };

const ConnectLines = () => {
    const box1Ref = useRef(null);
    const [selectedElement, setSelectedElement] = useState(null)
    const [pairs, setPairs] = useState([{ start: 'comp1', end: 'comacp2' }])

    return (
        <div className='flex flex-1 flex-row bg-lightBlue justify-center items-center w-100 gap-48'>
            <div className='flex flex-col gap-20'>
                <ConnectableElement id={'comp1'} label='Levi red 1' setPairs={setPairs} selectedElement={selectedElement} setSelectedElement={setSelectedElement} />
                <ConnectableElement id={'comp2'} label='Levi red 2' setPairs={setPairs} selectedElement={selectedElement} setSelectedElement={setSelectedElement} />
                <ConnectableElement id={'c'} label='LR3' setPairs={setPairs} selectedElement={selectedElement} setSelectedElement={setSelectedElement} />
            </div>
            <div className='flex flex-col gap-20'>
                <ConnectableElement id={'comp1'} label='DR1' setPairs={setPairs} />
                <ConnectableElement id={'coacmp1'} label='DE2 ' setPairs={setPairs} />
                <ConnectableElement id={'comacp2'} label='DESNI 3' setPairs={setPairs} />
            </div>

            {pairs.map((pair) => <Xarrow start={pair.start} end={pair.end} />)}
        </div>
    );
}

export default ConnectLines;
