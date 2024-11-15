import { useDrop } from 'react-dnd';
import { useState } from 'react';

const DropZone = ({ dropItem }) => {
    const [hasDropped, setHasDropped] = useState(false);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'BOX',
        drop: (item) => {

            if (item.id == dropItem.id) {
                setHasDropped(true);
                return { correct: true };
            } else {

                return { correct: false };
            }
        },

        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));
    if (dropItem.answer.image && !dropItem.answer.text) return <div
        ref={drop}
        className='shadow1'
        style={{
            padding: '16px',
            cursor: 'move',
            width: '220px',
            height: '220px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: hasDropped ? 'lightgreen' : isOver ? 'white' : 'white',
        }}
    >
        <img
            src={`${import.meta.env.VITE_APP_BASE_URL}/storage/${dropItem.answer.image}`}
            alt={dropItem.answer.text}

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
            ref={drop}
            className='shadow1'
            style={{
                padding: '16px',
                cursor: 'move',
                width: '220px',
                height: '220px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                backgroundColor: hasDropped ? 'lightgreen' : isOver ? 'white' : 'lightgray',
            }}
        >
            <span className='text-center font-bold text-2xl' > {dropItem.answer.text}</span>
        </div>
    );
};

export default DropZone;
