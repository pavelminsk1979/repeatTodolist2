import React from 'react';
import {FilterType, TaskType} from "./App";
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import {TemplateCreatingTaskTudulist} from "./TemplateCreatingTaskTudulist";
import {TemplateEditTitle} from "./TemplateEditTitle";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {DeleteOutline} from "@material-ui/icons";

type TodolistType = {
    header: string
    tasks: Array<TaskType>
    removeTask: (idTodol: string, idTask: string) => void
    filterTasks: (idTodol: string, valueButtonFilter: FilterType) => void
    addedTask: (idTodol: string, text: string) => void
    changeCheckboxTask: (idTodol: string, idTask: string, isDone: boolean) => void
    filterValue: FilterType
    todolistId: string
    removeTodolist: (idTodol: string) => void
    editTodolistTitle: (idTodol: string, editTitle: string) => void
    editTaskTitle: (idTodol: string, idTask: string, editTitle: string) => void
}

export function Todolist(props: TodolistType) {

    const addedTaskHandler = (text: string) => {
        props.addedTask(props.todolistId, text)
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    const removeHundler = (idTask: string) => {
        props.removeTask(props.todolistId, idTask)
    }

    const filterTasksHandler = (idTodol: string, valueButtonFilter: FilterType) => {
        props.filterTasks(idTodol, valueButtonFilter)
    }

    const changeCheckboxHandler = (idTask: string, isDone: boolean) => {
        props.changeCheckboxTask(props.todolistId, idTask, isDone)
    }

    const editTodolistTitleHandler = (editTitle: string) => {
        props.editTodolistTitle(props.todolistId, editTitle)
    }

    const editTaskTitleHandler = (idTask: string, editTitle: string) => {
        props.editTaskTitle(props.todolistId, idTask, editTitle)
    }


    return (
        <div>
            <div>
                <h3>
                    <TemplateEditTitle
                        callback={editTodolistTitleHandler}
                        title={props.header}
                    />
                    <IconButton
                        style={{
                            color: "crimson"
                        }}
                        onClick={removeTodolistHandler}>
                        <DeleteOutline/>
                    </IconButton>
                </h3>

                <TemplateCreatingTaskTudulist
                    name={'new task'}
                    callback={addedTaskHandler}
                />
                <div>
                    {
                        props.tasks.map(tsk => {
                            return (
                                <div key={tsk.id}>
                                    <Checkbox
                                        style={{
                                            color: "sienna",
                                        }}
                                        size={"small"}
                                        onChange={(event) =>
                                            changeCheckboxHandler(tsk.id,
                                                event.currentTarget.checked)}
                                        checked={tsk.isDone}
                                        defaultChecked
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    />
                                    <TemplateEditTitle
                                        title={tsk.title}
                                        callback={
                                            (editTitle: string) => editTaskTitleHandler(
                                                tsk.id, editTitle)}/>
                                    <IconButton
                                        style={{
                                            color: "crimson",
                                        }}
                                        size="small"
                                        onClick={() => removeHundler(tsk.id)}>
                                        <DeleteSweepIcon/>
                                    </IconButton>
                                </div>
                            )
                        })
                    }
                </div>
                <div>


                    <Button
                        style={{
                            maxWidth: '60px',
                            maxHeight: '25px',
                            minWidth: '60px',
                            minHeight: '25px',
                            backgroundColor: props.filterValue === 'all' ? 'sienna' : 'silver',
                            color: "white",

                        }}
                        onClick={() => filterTasksHandler(
                            props.todolistId, 'all')}>ALL
                    </Button>
                    <Button
                        style={{
                            maxWidth: '60px',
                            maxHeight: '25px',
                            minWidth: '60px',
                            minHeight: '25px',
                            backgroundColor: props.filterValue === 'yes' ? 'sienna' : 'silver',
                            color: "white",
                            marginLeft: '10px'
                        }}
                        onClick={() => filterTasksHandler(
                            props.todolistId, 'yes')}>YES
                    </Button>
                    <Button
                        style={{
                            maxWidth: '60px',
                            maxHeight: '25px',
                            minWidth: '60px',
                            minHeight: '25px',
                            backgroundColor: props.filterValue === 'no' ? 'sienna' : 'silver',
                            color: "white",
                            marginLeft: '10px'
                        }}
                        onClick={() => filterTasksHandler(
                            props.todolistId, 'no')}>NO
                    </Button>
                </div>
            </div>
        </div>
    );
}


