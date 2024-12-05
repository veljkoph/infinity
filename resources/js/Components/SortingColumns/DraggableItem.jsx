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
        opacity: isDragging ? 0.7 : 1,
        zIndex: isDragging ? 100 : 1,
        transition: isDragging ? "none" : "transform 0.3s ease",
        position: isInColumn ? "absolute" : "relative",

    };
    if (item.image && !item.text)
        return (
            <div
                ref={setNodeRef}
                {...attributes}
                {...listeners}
                style={{
                    ...style,

                }}
                className="p-[10px] m-[5px] flex items-center justify-center bg-white border border-gray-400 rounded-[5px] cursor-grab text-center w-[100px] h-[100px] xl:w-[140px] xl:h-[140px]"
            >
                <img className="rounded-xl" src={`${import.meta.env.VITE_APP_BASE_URL}/storage/${item.image}`}
                    alt={item.text} />
            </div>)

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={{
                ...style,
            }}
            className="p-[10px] m-[5px] bg-[#CBE5F1] border border-gray-400 rounded-[5px] cursor-grab text-center w-[200px]"
        >
            {item?.text}
        </div >
    );
};
export default DraggableItem
