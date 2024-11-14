import React, { useState } from 'react';
import { router } from '@inertiajs/react'
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from '@/Components/Sorting/SortableItem';
import Correct from '@/Components/Global/Correct';
import TaskHeader from '@/Components/Global/TaskHeader';

const shuffleArray = (array) => {
    let shuffled = [...array];
    do {
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
    } while (shuffled.every((item, index) => item === array[index]));

    return shuffled;
};

const Sorting = ({ task }) => {
    const [items, setItems] = useState(() => shuffleArray(task.answers));
    const [activeId, setActiveId] = useState(null);
    const [isFinished, setIsFinished] = useState(false)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragStart(event) {
        setActiveId(event.active.id);
    }

    function handleDragEnd(event) {
        const { active, over } = event;
        setActiveId(null);

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);
                const newItems = arrayMove(items, oldIndex, newIndex);

                // Nakon ažuriranja items, kreiramo newArray i proveravamo da li se podudara
                const newArray = newItems.map(item => item.text).join('');
                if (newArray.toLowerCase() === task.correctSorting.toLowerCase()) {
                    setIsFinished(true)
                    task.nextTaskId ? setTimeout(() => router.visit(`/task/${task.nextTaskId}`), 1000) : setTimeout(() => router.visit(`/exercises/${task.lessonId}`), 2200)

                }

                return newItems;
            });
        }
    }

    return (
        <div className='flex flex-col relative items-center  border-l border-r border-b  rounded-b-lg w-full  bg-white fade-in'>
            <TaskHeader task={task} />

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}

            >
                <SortableContext
                    items={items.map(item => item.id)}
                    strategy={rectSortingStrategy}


                >

                    <div className="relative flex flex-col gap-10 p-10 h-full items-center">


                        {task?.image && <img
                            src={`${import.meta.env.VITE_APP_BASE_URL}/storage/${task.image}`}
                            alt="NO"
                            className='top-20 w-32 h-32 object-cover rounded-xl' />}
                        <div className="relative flex flex-row  items-center">
                            {items.map(item => (
                                <SortableItem key={item.id} id={item.id} text={item.text} />
                            ))}</div></div>
                </SortableContext>

                {/* Prikazujemo `DragOverlay` za aktivni element */}
                <DragOverlay>
                    {activeId ? <SortableItem id={activeId} text={items.find(item => item.id === activeId)?.text} /> : null}
                </DragOverlay>
                {isFinished && <Correct hasNextTask={task.nextTaskId} lessonId={task.lessonId} />}
            </DndContext>
        </div>
    );
};

export default Sorting;
