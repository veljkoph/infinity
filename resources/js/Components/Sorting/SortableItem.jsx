// SortableItem.js
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const SortableItem = ({ id, text }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: id.toString() });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition || 'transform 250ms ease',
        border: "1px solid #ccc",
        borderRadius: "4px",
        marginBottom: "8px",
        backgroundColor: isDragging ? "#fff" : "#f4f4f4", // Ističemo boju kad se element prevlači
        cursor: "grab",
        height: 'fit-content',
        width: 'fit-content',
        color: isDragging ? "#fff" : "#000", margin: '10px',
        fontSize: '24px',
        fontWeight: 'bold',
        padding: '10px 20px'
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {text.toUpperCase()}
        </div>
    );
};
