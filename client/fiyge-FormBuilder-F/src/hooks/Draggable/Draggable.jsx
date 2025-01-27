


import React from 'react';
import {useDraggable} from '@dnd-kit/core';

function Draggable({ children, id}) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}

        >
            {children}

        </div>
    );
}
export default Draggable;