import { useDrop } from 'react-dnd';
import { useState } from 'react';

const DropZone = ({ id, correct }) => {
    const [hasDropped, setHasDropped] = useState(false);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'BOX',
        drop: (item) => {
            console.log(item, "sss")
            if (correct) {
                setHasDropped(true);
            } else {
                alert('Pogrešan odgovor! Pokušaj ponovo.');
            }
        },

        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            style={{
                height: '100px',
                width: '200px',
                margin: '8px',
                backgroundColor: hasDropped ? 'lightgreen' : isOver ? 'lightcoral' : 'lightgray',
                textAlign: 'center',
                lineHeight: '100px',
            }}
        >
            {hasDropped ? 'Tačno!' : 'Prevuci ovde'}xD
        </div>
    );
};

export default DropZone;
