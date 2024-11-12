
import { Card } from '@/Components/Sorting/Card'
import update from 'immutability-helper'
import React from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


const Sorting = ({ task }) => {
    const [cards, setCards] = useState(task.answers)
    const moveCard = useCallback((dragIndex, hoverIndex) => {
        setCards((prevCards) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex]],
                ],
            }),
        )
    }, [])
    const renderCard = useCallback((card, index) => {
        return (
            <Card
                key={card.id}
                index={index}
                id={card.id}
                text={card.text}
                moveCard={moveCard}
                direction={task.question}
            />
        )
    }, [])

    return (
        <div className='flex flex-col bg-slate-200 w-full relative items-center '>
            <h1>{task.title}</h1>
            <DndProvider backend={HTML5Backend}>
                <div className={`flex ${task.question === 'horizontal' ? 'flex-row' : 'flex-col'} p-3 gap-8`} >{cards.map((card, i) => renderCard(card, i))}</div>
            </DndProvider>
        </div>
    )
}

export default Sorting
