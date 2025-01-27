

import React from 'react';
import {useDroppable} from '@dnd-kit/core';

function Droppable({ children, id }) {
    const { isOver, setNodeRef } = useDroppable({
        id: id
    });

    return (
        <div
            ref={setNodeRef}
            style={{
                border: '2px dashed gray',
                minHeight: '100px',
                padding: '10px',
                backgroundColor: isOver ? 'lightgreen' : 'white'
            }}
        >
            {children.length > 0 ? children : 'Drop here'}
        </div>
    );
}

export default Droppable;