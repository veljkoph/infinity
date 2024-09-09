import { useDrag } from 'react-dnd';

const DragCard = ({ id, text }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'BOX',
        item: { id },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            console.log(dropResult, 'DRL')
            if (dropResult && dropResult.correct) {
                onDropSuccess(id);
                alert(id, 'tac')// Pozovi callback kada je tačno prevučeno
            }
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0 : 1,
                padding: '16px',
                margin: '8px',
                backgroundColor: 'lightblue',
                cursor: 'move',
                width: '100px'
            }}
        >
            {text}
        </div>
    );
};

export default DragCard;
