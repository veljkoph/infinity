import React, { useState } from 'react';
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

const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const Sorting = ({ task }) => {
    const [items, setItems] = useState(() => shuffleArray(task.answers));
    const [activeId, setActiveId] = useState(null); // Dodajemo stanje za aktivni element
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragStart(event) {
        setActiveId(event.active.id); // Čuvamo aktivni element kad počne prevlačenje
    }

    function handleDragEnd(event) {
        const { active, over } = event;
        setActiveId(null); // Poništavamo aktivni element kad prevlačenje završi

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    return (
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
                <div className="flex flex-row items-center justify-center w-full bg-white ">
                    {items.map(item => (
                        <SortableItem key={item.id} id={item.id} text={item.text} />
                    ))}</div>
            </SortableContext>

            {/* Prikazujemo `DragOverlay` za aktivni element */}
            <DragOverlay>
                {activeId ? <SortableItem id={activeId} text={items.find(item => item.id === activeId)?.text} /> : null}
            </DragOverlay>
        </DndContext>
    );
};

export default Sorting;
