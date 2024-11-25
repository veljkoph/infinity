import {

    useDraggable,
} from "@dnd-kit/core";

const DraggableItem = ({ id, item, unassignedItems }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id,
    });

    const isInColumn = unassignedItems.some(i => i.id === item.id);

    const style = {

        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : "translate(0, 0)",
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 100 : 1,
        transition: isDragging ? "none" : "transform 0.3s ease",
        position: isInColumn ? "absolute" : "relative",
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
                width: '200px',
                textAlign: 'center'
            }}

        >
            {item?.text}
        </div>
    );
};
export default DraggableItem
