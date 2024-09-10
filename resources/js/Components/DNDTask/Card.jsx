import { useState } from 'react';
import { useDrag } from 'react-dnd';

const DragCard = ({ item, handleDropSuccess }) => {
    const [dropResult, setDropResult] = useState(true)

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'BOX',
        item: item,
        end: (item, monitor) => {
            const dR = monitor.getDropResult();
            setDropResult(dR)

            if (dR.correct) {
                handleDropSuccess(item.id)

            }
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    if (item.question.image && item.question.text) return <div
        ref={drag}
        style={{
            opacity: isDragging ? 0 : 1,
            borderRadius: 10,
            backgroundColor: 'white',
            cursor: 'move',
            width: '220px',
            padding: '5px',
            height: '220px',

            display: dropResult?.correct === true ? 'none' : 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}
    >
        <img
            src={`${import.meta.env.VITE_APP_BASE_URL}/storage/${item.question.image}`}
            alt={item.question.text}

            style={{
                width: '160px',
                height: '160px',
                overflow: 'hidden',
                objectFit: 'contain'

            }}
        />
        <span className='text-center font-bold text-xl' > {item.question.text}</span>
    </div>
    if (item.question.image && !item.question.text) return <div
        ref={drag}
        style={{
            opacity: isDragging ? 0 : 1,
            borderRadius: 10,
            backgroundColor: 'white',
            cursor: 'move',
            width: '220px',
            padding: '5px',
            height: '220px',
            display: dropResult?.correct === true ? 'none' : 'block'
        }}
    >
        <img
            src={`${import.meta.env.VITE_APP_BASE_URL}/storage/${item.question.image}`}
            alt={item.question.text}

            style={{
                width: '210px',
                height: '210px',
                overflow: 'hidden',
                objectFit: 'contain'

            }}
        />
    </div>
    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0 : 1,
                padding: '16px',
                backgroundColor: 'white',
                cursor: 'move',
                width: '220px',
                height: '220px',
                display: dropResult?.correct === true ? 'none' : 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
            }}
        >
            <span className='text-center font-bold text-2xl' > {item.question.text}</span>
        </div>
    );
};

export default DragCard;
