import React from 'react'
import TaskHeader from './TaskHeader'


const TaskContainer = ({ children, task, className }) => {
    return (
        <div className={`flex flex-col relative items-center  border-l border-r border-b  rounded-b-lg w-full   fade-in ${className || 'bg-white'}`}>
            <TaskHeader task={task} />
            <div className='w-full p-5'> {children} </div></div>
    )
}

export default TaskContainer
