import React from "react";

import Draggable from "../../hooks/Draggable/Draggable.jsx";
import {DndContext} from "@dnd-kit/core";
import Droppable from "../../hooks/Droppable/Droppable.jsx";
import {useEffect, useRef, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";



function Formbuilder() {
    const [draggableMarkup, setDraggableMarkup] = useState({
        0: {
            id: 101,
            type: 'text',
            formprops: {
                name: 'text',
                label: 'text',
                type: 'text',
                placeholder: 'Enter your text',
                required: false,
                validation: null,
            },
            content: (props) => <input {...props.formprops}></input>,
            isDropped: false
        },
        1: {
            id: 102,
            type: 'dropdown',
            formprops: {
                name: 'dropdown',
                type: 'select',
                options: ['lemon', 'tea'],
                placeholder: "Select an option",
                required: false,
                label: "Dropdown",
                className: "",
                validation: null
            },
            content: (props) => (
                <select {...props.formprops}>
                    {props.formprops.options.map((option, key) => (
                        <option value={option} key={key}>
                            {option}
                        </option>
                    ))}
                </select>
            ),
            isDropped: false
        },
    });


    function handleDragEnd(event) {
        const {active, over} = event;
        console.log(event);

        if (over && over.id === 'droppable') {
            // Logic for dropping into droppable
            setDraggableMarkup(prev => {
                const newMarkup = {...prev};
                const draggedKey = Object.keys(prev).find(
                    key => prev[key].id === active.id
                );
                let newKey = Object.keys(draggableMarkup).length;
                console.log(newKey);

                if (draggedKey && !newMarkup[draggedKey].isDropped) {
                    newMarkup[newKey] = Object.assign({}, newMarkup[draggedKey]);
                    newMarkup[newKey].id += 2;
                    newMarkup[draggedKey].isDropped = true;
                    // TODO: save to a variable to be stored in backend
                    // console.log(draggedKey);
                }

                // newMarkup

                return newMarkup;
            });
        } else {
            // If dragged out of droppable, reset isDropped
            setDraggableMarkup(prev => {
                const newMarkup = {...prev};
                const draggedKey = Object.keys(prev).find(
                    key => prev[key].id === active.id
                );


                if (draggedKey) {
                    newMarkup[draggedKey].isDropped = false;
                }
                for (let key in newMarkup) {
                    if (key !== draggedKey &&
                        // TODO: instead of comparing content, compare form type
                        (newMarkup[key].type.localeCompare(newMarkup[draggedKey].type) === 0) &&
                        newMarkup[key].isDropped === false
                    ) {
                        delete newMarkup[key];
                        // TODO: remove from the variable which will be sent to backend
                        break;
                    }
                }


                return newMarkup;
            });
        }
    }

    function editFormProps(id) {

    }


    // Dialog box stuff
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <button onClick={() => handleClickOpen()}>edit</button>
            <DndContext onDragEnd={handleDragEnd}>
                <div style={{display: 'flex', gap: '10px'}}>
                    <div>
                        {Object.values(draggableMarkup)
                            .filter(item => !item.isDropped)
                            .map(item => (
                                <Draggable key={item.id} id={item.id}>
                                    {typeof item.content === 'function'
                                        ? item.content({formprops: item.formprops})
                                        : item.content}
                                </Draggable>
                            ))}
                    </div>

                    <Droppable id="droppable">
                        {Object.values(draggableMarkup)
                            .filter(item => item.isDropped)
                            .map(item => (
                                <Draggable key={item.id} id={item.id}>
                                    <div className="flex flex-row">
                                        <div className="flex-auto">
                                            {typeof item.content === 'function'
                                                ? item.content({formprops: item.formprops})
                                                : item.content}
                                        </div>
                                        <div className="flex-none">
                                            <button onClick={(e) => {
                                                e.stopPropagation();
                                                handleClickOpen();
                                            }}
                                                    data-drag-handle={false} >edit</button>
                                        </div>

                                    </div>
                                </Draggable>
                            ))}
                    </Droppable>
                </div>
            </DndContext>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Subscribe</Button>
                </DialogActions>
            </Dialog>
        </>
    )

}

// function handleDragEnd(event) {
//     if (event.over && event.over.id === 'droppable') {
//         // setIsDropped(true);
//         setDraggableMarkup(event.isDropped=true)
//     }
// }
// }

export default Formbuilder;