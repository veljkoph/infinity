import React from 'react'
import Questions from './Questions';

const Home = ({ task }) => {
    console.log(task)
    const components = {
        question: Questions,

    };

    const TaskType = components[task?.type];

    return (
        <TaskType task={task} />
    )
}

export default Home
