import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

const style = {
    border: '1px solid gray',
    padding: '30px 20px',
    backgroundColor: 'white',
    cursor: 'move',
    borderRadius: 10,
    marginBottom: 20,
}
export const Card = ({ id, text, index, moveCard, direction }) => {

    const ref = useRef(null)
    const [{ handlerId }, drop] = useDrop({
        accept: "CARD",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            // Check if direction is vertical or horizontal
            if (direction === 'vertical') {
                // Calculate vertical middle
                const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
                // Determine mouse position
                const clientOffset = monitor.getClientOffset()
                const hoverClientY = clientOffset.y - hoverBoundingRect.top

                // Dragging downwards
                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                    return
                }
                // Dragging upwards
                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                    return
                }
            } else if (direction === 'horizontal') {
                // Calculate horizontal middle
                const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2
                // Determine mouse position
                const clientOffset = monitor.getClientOffset()
                const hoverClientX = clientOffset.x - hoverBoundingRect.left

                // Dragging to the right
                if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
                    return
                }
                // Dragging to the left
                if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
                    return
                }
            }

            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
    })
    const [{ isDragging }, drag] = useDrag({
        type: "CARD",
        item: () => {
            return { id, index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const opacity = isDragging ? 0 : 1
    drag(drop(ref))
    return (
        <div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
            {text}
        </div>
    )
}
