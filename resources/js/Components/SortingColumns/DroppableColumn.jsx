import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import DraggableItem from "./DraggableItem";

const DroppableColumn = ({ id, items, unassignedItems, columns }) => {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            className="w-[212px] min-h-[380px] xl:min-h-[500px] m-[10px] bg-white border border-gray-400 rounded-[5px] flex flex-col items-center"
        >
            <SortableContext
                items={items.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
            >
                <div className="bg-slate-200 w-full h-10 text-center flex items-center justify-center border-b border-b-slate-700 rounded-t-lg">
                    <p>{columns.find(column => column.id === id)?.name}</p>
                </div>

                {items.map((item) => (
                    <DraggableItem unassignedItems={unassignedItems} key={item.id} id={item.id} item={item} />

                ))}
            </SortableContext>
        </div>
    );
};
export default DroppableColumn
