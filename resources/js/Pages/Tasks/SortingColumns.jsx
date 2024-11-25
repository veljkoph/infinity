import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";

import TaskContainer from "@/Components/Global/TaskContainer";
import DroppableColumn from "@/Components/SortingColumns/DroppableColumn";
import DraggableItem from "@/Components/SortingColumns/DraggableItem";

const SortingColumns = ({ task }) => {
    const [unassignedItems, setUnassignedItems] = useState(task.sortableItems);

    const [columns, setColumns] = useState(
        task.answers.reduce((acc, answer) => {
            acc[answer.id] = [];
            return acc;
        }, {})
    );

    const handleDragEnd = ({ active, over }) => {
        const activeId = active.id;
        const overId = over?.id;

        const item = unassignedItems.find((i) => i.id === activeId) ||
            Object.values(columns).flat().find((i) => i.id === activeId);

        if (!item) return;

        // Proveri da li `columnID` stavke odgovara `overId` kolone
        if (overId && item.columnID !== overId) {
            return;
        }

        if (overId) {
            // Premeštanje stavke u kolonu
            const sourceColumn = Object.keys(columns).find((key) =>
                columns[key].some((i) => i.id === activeId)
            );

            if (sourceColumn) {
                setColumns((prev) => ({
                    ...prev,
                    [sourceColumn]: prev[sourceColumn].filter((i) => i.id !== activeId),
                }));
            } else {
                setUnassignedItems((prev) => prev.filter((i) => i.id !== activeId));
            }

            setColumns((prev) => ({
                ...prev,
                [overId]: [...prev[overId], item],
            }));
        } else {
            // Ako nije blizu nijedne kolone, vraća se u početni set
            if (!unassignedItems.some((i) => i.id === activeId)) {
                setUnassignedItems((prev) => [...prev, item]);
                setColumns((prev) =>
                    Object.fromEntries(
                        Object.entries(prev).map(([key, items]) => [
                            key,
                            items.filter((i) => i.id !== activeId),
                        ])
                    )
                );
            }
        }
    };
    //MOra da se doda column text naslov, ovako pravi samo idjeve i nema texta kolone
    console.log(columns)

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <TaskContainer task={task} className="bg-slate-100">
                <div className="flex p-5 items-center justify-center">
                    {unassignedItems.map((item, index) => (
                        <DraggableItem key={item.id} id={item.id} item={item} unassignedItems={unassignedItems} />
                    ))}
                </div>

                <div className="flex flex-row w-full justify-center gap-16 p-10">
                    {Object.keys(columns).map((columnId) => (
                        <DroppableColumn columns={task.answers} unassignedItems={unassignedItems} key={columnId} id={columnId} items={columns[columnId]} />
                    ))}
                </div>
            </TaskContainer>
        </DndContext>
    );
};

export default SortingColumns;
