import React from 'react'
import Questions from './Questions';
import Draw from './Draw';
import DragNDrop from './DragNDrop';
import ConnectLines from './ConnectLines';
import Sorting from './Sorting';
import SortingColumns from './SortingColumns';

const Home = ({ task }) => {
    const components = {
        question: Questions,
        drawing: Draw,
        drag_and_drop: DragNDrop,
        connect_lines: ConnectLines,
        sorting: Sorting,
        sorting_columns: SortingColumns,
    };
    const TaskType = components[task?.type];

    return (
        <TaskType task={task} />
    )
}

export default Home
