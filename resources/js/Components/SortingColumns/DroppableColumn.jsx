import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import DraggableItem from "./DraggableItem";

const DroppableColumn = ({ id, items, unassignedItems, columns }) => {
    const { setNodeRef } = useDroppable({ id });
    console.log(columns)
    return (
        <div
            ref={setNodeRef}
            style={{
                width: "200px",
                minHeight: "400px",
                margin: "10px",
                backgroundColor: "white",
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
