import React from "react";

import Draggable from "../../hooks/Draggable/Draggable.jsx";
import {DndContext, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import Droppable from "../../hooks/Droppable/Droppable.jsx";
import {useEffect, useRef, useState} from "react";
import {
    Button, Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    TextField
} from "@mui/material";
import {useAuth} from "../../hooks/AuthProvider/useAuth.jsx";
import axios from "axios";


function Formbuilder() {
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // Minimum distance in pixels before dragging starts
            },
        })
    );
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
            isDropped: false
        },
        1: {
            id: 102,
            type: 'dropdown',
            formprops: {
                name: 'dropdown',
                type: 'select',
                options: ['Option 1', 'Option 2'],
                placeholder: "Select an option",
                required: false,
                label: "Dropdown",
                className: "",
                validation: null
            },
            isDropped: false
        },
        2: {
            id: 103,
            type: 'checkbox',
            formprops: {
                name: 'checkbox',
                type: 'checkbox',
                label: 'Checkbox',
                required: false,
            },

            isDropped: false,
        },
        3: {
            id: 104,
            type: 'radio',
            formprops: {
                name: 'radio',
                type: 'radio',
                label: 'Radio',
                options: ['Option 1', 'Option 2'],
                required: false,
            },

            isDropped: false,
        },
        4: {
            id: 105,
            type: 'date',
            formprops: {
                name: 'date',
                type: 'date',
                label: 'Date Picker',
                required: false,
            },

            isDropped: false,
        },
        5: {
            id: 106,
            type: 'file',
            formprops: {
                name: 'file',
                type: 'file',
                label: 'File Upload',
                required: false,
                accept: '.jpg,.png,.pdf', // Example of accepted file types
            },

            isDropped: false,
        },
    });

    const renderContent = (item) => {
        switch (item.type) {
            case 'text':
            case 'number':
            case 'email':
            case 'search':
            case 'range':
                return <input {...item.formprops} />;

            case 'dropdown':
                return (
                    <select {...item.formprops}>
                        {item.formprops.options.map((option, key) => (
                            <option value={option} key={key}>
                                {option}
                            </option>
                        ))}
                    </select>
                );

            case 'checkbox':
                return (
                    <div>
                        <label>
                            <input {...item.formprops} />
                            {item.formprops.label}
                        </label>
                    </div>
                );

            case 'radio':
                return (
                    <div>
                        <label>{item.formprops.label}</label>
                        {item.formprops.options.map((option, key) => (
                            <div key={key}>
                                <label>
                                    <input
                                        type="radio"
                                        name={item.formprops.name}
                                        value={option}
                                        required={item.formprops.required}
                                    />
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                );

            case 'date':
                return (
                    <div>
                        <label>{item.formprops.label}</label>
                        <input {...item.formprops} />
                    </div>
                );

            case 'file':
                return (
                    <div>
                        <label>{item.formprops.label}</label>
                        <input {...item.formprops} />
                    </div>
                );

            default:
                return null;
        }
    };

    // Modified save form function
    const handlesaveform = async () => {
        if(!formName) {
            alert("Form name required");
            return;
        }

        // Create a clean version of the form data without functions
        const formDataToSave = Object.entries(draggableMarkup).reduce((acc, [key, value]) => {
            acc[key] = {
                id: value.id,
                type: value.type,
                formprops: value.formprops,
                isDropped: value.isDropped
            };
            return acc;
        }, {});

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/forms/save`,
                {
                    form_name: formName,
                    form_data: formDataToSave
                },
                {
                    headers: {
                        'authorization': `Bearer ${user.token}`
                    }
                }
            );

            if(response.status === 201) {
                alert("Form saved successfully");
                window.location.reload();
            }
        } catch (err) {
            alert(err.message);
        }
    };
    const fieldTypes = [
        {value: 'text', label: 'Text Field'},
        {value: 'number', label: 'Number Field'},
        {value: 'range', label: 'Range Field'},
        {value: 'search', label: 'Search Field'},
        {value: 'email', label: 'Email Field'},
    ];


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
                // let newKey = Object.keys(draggableMarkup).length;
                // console.log(newKey);

                if (draggedKey && !newMarkup[draggedKey].isDropped) {
                    const newKey = Math.max(...Object.keys(prev).map(Number)) + 1;

                    // Create a deep copy of the dragged element
                    newMarkup[newKey] = {
                        ...JSON.parse(JSON.stringify(newMarkup[draggedKey])),
                        id: Math.max(...Object.values(prev).map(item => item.id)) + 1,
                        content: newMarkup[draggedKey].content // Preserve the content function
                    };
                    newMarkup[newKey].id += 6;
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

    const enabledTypes = ['text', 'search', 'range', 'email', 'number'];
    // Dialog box state
    const [open, setOpen] = useState(false);
    const [openFormId, setOpenFormId] = useState(null);
    const formInitialstate = {
        name: '',
        label: '',
        type: '',
        placeholder: '',
        options: '',
        required: false,
    };
    const [formValues, setFormValues] = useState(formInitialstate);
    const [enableTextType, setEnableTextType] = useState(false);

    function EditFormProps(id) {

        setOpenFormId(id);

        const record = Object.values(draggableMarkup).find(item => item.id === id);
        if (record) {
            setFormValues({
                name: record.formprops.name,
                label: record.formprops.label,
                type: record.type,
                placeholder: record.formprops.placeholder || '',
                options: record.formprops.options ? record.formprops.options.join(', ') : '',
                required: record.formprops.required,
            });
            console.log(formValues);
            setEnableTextType(enabledTypes.includes(record.type));
        }
        setOpen(true);


    }

    const handleClose = () => {
        setOpen(false);
        setOpenFormId(null);
    };

    const handleFormChange = (e) => {
        const {name, value} = e.target;
        setFormValues(prev => ({...prev, [name]: value}));
    };

    const handleFormSubmit = () => {
        setDraggableMarkup(prev => {
            console.log(prev);
            const updatedMarkup = {...prev};
            const recordKey = Object.keys(updatedMarkup).find(
                key => updatedMarkup[key].id === openFormId
            );

            if (recordKey) {
                const updatedRecord = updatedMarkup[recordKey];
                updatedRecord.formprops.name = formValues.name;
                updatedRecord.formprops.label = formValues.label;
                if (updatedRecord.formprops.type.localeCompare(formValues.type)) {
                    updatedRecord.formprops.type = formValues.type;
                }
                updatedRecord.formprops.placeholder = formValues.placeholder;
                updatedRecord.formprops.required = formValues.required;

                // Update options if type is dropdown
                if (formValues.type === 'dropdown') {
                    updatedRecord.formprops.options = formValues.options
                        .split(',')
                        .map(opt => opt.trim());
                }

                // Update content for rerendering
                // updatedRecord.content =
                //     formValues.type === 'dropdown'
                //         ? (props) => (
                //             <select {...props.formprops}>
                //                 {updatedRecord.formprops.options.map((option, key) => (
                //                     <option value={option} key={key}>
                //                         {option}
                //                     </option>
                //                 ))}
                //             </select>
                //         )
                //         : (props) => <input {...props.formprops}></input>;

                // updatedMarkup[recordKey] = updatedRecord;
            }
            setFormValues(formInitialstate);

            return updatedMarkup;
        });

        handleClose();
    };
    const {user} = useAuth();
    const [formName, setFormName] = useState('');
    const handleformnamechange = (e)=>{
        setFormName(e.target.value);
    }
    // const handlesaveform = async () =>{
    //     // TODO: do api call
    //     if(!formName){
    //         alert("Form name required");
    //         return;
    //     }
    //     console.log(draggableMarkup);
    //     console.log(user);
    //
    //     await axios.post(import.meta.env.VITE_API_URL+"/api/forms/save", {form_name: formName, form_data: draggableMarkup},{
    //         headers: {
    //             'authorization': `Bearer ${user.token}`
    //         }}).then((result)=>{
    //             if(result.status === 201){
    //                 alert("Form saved successfully");
    //                 console.log(result);
    //                 window.location.reload();
    //             }
    //     }).catch((err)=>{
    //         alert(err.message);
    //     });
    //
    // }
    return (
        <>
            {/*<button onClick={() => handleClickOpen()}>edit</button>*/}
            <TextField name="Form Name" required={true} label="Form Name" variant="standard" value={formName}
                       onChange={handleformnamechange}/>
            <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                <div style={{display: 'flex', gap: '10px'}}>
                    <div>
                        {Object.values(draggableMarkup)
                            .filter(item => !item.isDropped)
                            .map(item => (
                                <Draggable key={item.id} id={item.id}>
                                    {renderContent(item)}
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
                                            {renderContent(item)}
                                        </div>
                                        <div className="flex-none">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    EditFormProps(item.id);
                                                }}
                                            >
                                                edit
                                            </button>
                                        </div>
                                    </div>
                                </Draggable>
                            ))}
                    </Droppable>
                </div>
            </DndContext>
            <Button variant="contained" onClick={handlesaveform}>Save Form</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Field Properties</DialogTitle>
                <DialogContent>
                    <DialogContentText>Edit field properties below:</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Name"
                        value={formValues.name}
                        onChange={handleFormChange}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="label"
                        label="Label"
                        value={formValues.label}
                        onChange={handleFormChange}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="placeholder"
                        label="Placeholder"
                        value={formValues.placeholder}
                        onChange={handleFormChange}
                        fullWidth
                        variant="standard"
                    />

                    {enableTextType && <TextField
                        margin="dense"
                        name="type"
                        label="Field Type"
                        select
                        SelectProps={{
                            native: true,
                        }}
                        value={formValues.type}
                        onChange={handleFormChange}
                        fullWidth
                        variant="standard"
                        disabled={!enabledTypes.includes(formValues.type)} // Disable if not in enabledTypes
                    >
                        {fieldTypes.map((field) => (
                            <option key={field.value} value={field.value}>
                                {field.label}
                            </option>
                        ))}
                    </TextField>}
                    {formValues.type === 'dropdown' && (
                        <TextField
                            margin="dense"
                            name="options"
                            label="Options (comma-separated)"
                            value={formValues.options}
                            onChange={handleFormChange}
                            fullWidth
                            variant="standard"
                        />
                    )}
                    {/*{formValues.type === 'radio' && (*/}
                    {/*    <TextField*/}
                    {/*        margin="dense"*/}
                    {/*        name="options"*/}
                    {/*        label="Options (comma-separated)"*/}
                    {/*        value={formValues.options}*/}
                    {/*        onChange={handleFormChange}*/}
                    {/*        fullWidth*/}
                    {/*        variant="standard"*/}
                    {/*    />*/}
                    {/*)}*/}
                    {formValues.type === 'radio' && (
                        <>
                            {/* Show existing options with remove buttons */}
                            {formValues.options.split(',').map((option, index) => (
                                <div key={index} className="flex items-center gap-2 mb-2">
                                    <TextField
                                        name={`option-${index}`}
                                        value={option.trim()}
                                        onChange={(e) => {
                                            const newOptions = formValues.options.split(',');
                                            newOptions[index] = e.target.value;
                                            setFormValues(prev => ({
                                                ...prev,
                                                options: newOptions.join(',')
                                            }));
                                        }}
                                        variant="standard"
                                    />
                                    <Button
                                        onClick={() => {
                                            const newOptions = formValues.options
                                                .split(',')
                                                .filter((_, i) => i !== index);
                                            setFormValues(prev => ({
                                                ...prev,
                                                options: newOptions.join(',')
                                            }));
                                        }}
                                        color="error"
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}

                            {/* Add new option button */}
                            <Button
                                onClick={() => {
                                    const currentOptions = formValues.options ? formValues.options.split(',') : [];
                                    currentOptions.push(`Option ${currentOptions.length + 1}`);
                                    setFormValues(prev => ({
                                        ...prev,
                                        options: currentOptions.join(',')
                                    }));
                                }}
                                variant="outlined"
                                className="mt-2"
                            >
                                Add Option
                            </Button>
                        </>
                    )}

                    {formValues.type === 'file' && (
                        <TextField
                            margin="dense"
                            name="accept"
                            label="Accepted File Types (e.g., .jpg,.png,.pdf)"
                            value={formValues.accept}
                            onChange={handleFormChange}
                            fullWidth
                            variant="standard"
                        />
                    )}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formValues.required}
                                onChange={handleFormChange}
                                name="required"
                                color="primary"
                            />
                        }
                        label="Required"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleFormSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    )

}

export default Formbuilder;