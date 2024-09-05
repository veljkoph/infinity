import React from 'react'
import Questions from './Questions';
import Draw from './Draw';

const Home = ({ task }) => {
    console.log(task)
    const components = {
        question: Questions,
        drawing: Draw

    };

    const TaskType = components[task?.type];

    return (
        <TaskType task={task} />
    )
}

export default Home
