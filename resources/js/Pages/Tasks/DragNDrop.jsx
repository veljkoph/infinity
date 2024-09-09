import TaskHeader from '@/Components/Global/TaskHeader'
import React from 'react'
import { useDrag } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import DragCard from '@/Components/DNDTask/Card'
import DropZone from '@/Components/DNDTask/DropZone'


const DragNDrop = ({ task }) => {
    return (
        <div className='flex flex-col bg-slate-200 w-full gap-4 relative'>
            <TaskHeader task={task} />
            <DndProvider backend={HTML5Backend}>
                <DragCard text='DRAG ME' />
                <DragCard text='DRAG ME' />
                <DragCard text='DRAG ME' />
                <DropZone id={1} correct={true} />
                <DropZone id={1} correct={false} />
            </DndProvider>
        </div>
    )
}

export default DragNDrop
