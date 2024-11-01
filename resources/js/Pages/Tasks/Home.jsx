import React from 'react'
import Questions from './Questions';
import Draw from './Draw';
import DragNDrop from './DragNDrop';
import ConnectLines from './ConnectLines';

const Home = ({ task }) => {

    const components = {
        question: Questions,
        drawing: Draw,
        drag_and_drop: DragNDrop,
        connect_lines: ConnectLines

    };

    const TaskType = components[task?.type];

    return (
        <TaskType task={task} />
    )
}

export default Home
