import React, { useState } from "react";
import {
    DndContext,
    closestCenter,
    useDroppable,
    useDraggable,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskContainer from "@/Components/Global/TaskContainer";

const DraggableItem = ({ id, content }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id,
    });
    const style = {

        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : "translate(0, 0)",
        position: "absolute", // Uvek apsolutno na početku
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 100 : 1, // Povećaj Z-index dok je prevučen
        transition: isDragging ? "none" : "transform 0.3s ease", // Smooth transition
    };

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={{
                ...style,
                padding: "10px",
                margin: "5px",
                backgroundColor: "lightblue",
                border: "1px solid gray",
                borderRadius: "5px",
                cursor: "grab",
            }}
        // className="absolute"
        >
            {content}
        </div>
    );
};

const DroppableColumn = ({ id, items }) => {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            style={{
                width: "200px",
                minHeight: "400px",
                margin: "10px",
                padding: "10px",
                backgroundColor: "lightgray",
                borderRadius: "5px",
                border: "1px solid gray",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <SortableContext
                items={items.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
            >
                {items.map((item) => (
                    <DraggableItem key={item.id} id={item.id} content={item.content} />
                ))}
            </SortableContext>
        </div>
    );
};

const SortingColumns = ({ task }) => {
    const [unassignedItems, setUnassignedItems] = useState([
        { id: "item1", content: "Item 1" },
        { id: "item2", content: "Item 2" },
        { id: "item3", content: "Item 3" },
        { id: "item4", content: "Item 4" },
    ]);

    const [columns, setColumns] = useState({
        column1: [],
        column2: [],
        column3: [],
    });

    const handleDragEnd = ({ active, over }) => {
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        // Check if the item was in unassigned items
        if (unassignedItems.some((item) => item.id === activeId)) {
            const item = unassignedItems.find((i) => i.id === activeId);
            const updatedItems = unassignedItems.filter((i) => i.id !== activeId);
            setUnassignedItems(updatedItems);
            setColumns((prev) => ({
                ...prev,
                [overId]: [...prev[overId], item],
            }));
        } else {
            // Moving between columns
            const sourceColumn = Object.keys(columns).find((key) =>
                columns[key].some((item) => item.id === activeId)
            );

            const item = columns[sourceColumn].find((i) => i.id === activeId);
            const sourceItems = columns[sourceColumn].filter((i) => i.id !== activeId);
            const targetItems = [...columns[overId], item];

            setColumns({
                ...columns,
                [sourceColumn]: sourceItems,
                [overId]: targetItems,
            });
        }
    };

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <TaskContainer task={task} className='bg-slate-100'>

                <div
                    className="flex p-10 items-center justify-center"
                >
                    {unassignedItems.map((item) => (
                        <DraggableItem key={item.id} id={item.id} content={item.content} />
                    ))}
                </div>

                <div
                    className="flex flex-row w-full justify-between p-20 "
                >
                    {Object.keys(columns).map((columnId) => (
                        <DroppableColumn key={columnId} id={columnId} items={columns[columnId]} />
                    ))}
                </div>

            </TaskContainer>
        </DndContext>
    );
};

export default SortingColumns;
