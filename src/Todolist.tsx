import React, {memo, useCallback} from 'react';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import {TemplateCreatingTaskTudulist} from "./TemplateCreatingTaskTudulist";
import {TemplateEditTitle} from "./TemplateEditTitle";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {DeleteOutline} from "@material-ui/icons";
import {FilterType, TaskType} from "./AppWithRedux";
import {Task} from "./Task";

type TodolistType = {
    header: string
    tasks: Array<TaskType>
    removeTask: (idTodol: string, idTask: string) => void
    statusFilterForTudulist: (idTodol: string, valueButtonFilter: FilterType) => void
    addedTask: (idTodol: string, text: string) => void
    changeCheckboxTask: (idTodol: string, idTask: string, isDone: boolean) => void
    filterValue: FilterType
    todolistId: string
    removeTodolist: (idTodol: string) => void
    editTodolistTitle: (idTodol: string, editTitle: string) => void
    editTaskTitle: (idTodol: string, idTask: string, editTitle: string) => void
}

export const Todolist=memo((props: TodolistType)=> {
    console.log('Todolist')

    const addedTaskHandler = useCallback((text: string) => {
        props.addedTask(props.todolistId, text)
    },[ props.addedTask,props.todolistId])

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    const removeHundler = useCallback((idTask: string) => {
        props.removeTask(props.todolistId, idTask)
    },[props.removeTask,props.todolistId])

    const filterTasksHandler = (idTodol: string, valueButtonFilter: FilterType) => {
        props.statusFilterForTudulist(idTodol, valueButtonFilter)
    }

    const changeCheckboxHandler = useCallback((idTask: string, isDone: boolean) => {
        props.changeCheckboxTask(props.todolistId, idTask, isDone)
    },[props.changeCheckboxTask,props.todolistId])

    const editTodolistTitleHandler = (editTitle: string) => {
        props.editTodolistTitle(props.todolistId, editTitle)
    }

    const editTaskTitleHandler = useCallback((idTask: string, editTitle: string) => {
        props.editTaskTitle(props.todolistId, idTask, editTitle)
    },[props.editTaskTitle,props.todolistId])

    let tasksAfterFilter = props.tasks
    if (props.filterValue === 'yes') {
        tasksAfterFilter = tasksAfterFilter.filter(el => el.isDone)
    }
    if (props.filterValue === 'no') {
        tasksAfterFilter = tasksAfterFilter.filter(el => !el.isDone)
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
                        tasksAfterFilter.map(tsk => {
                            return (
                            <Task
                                editTaskTitle={editTaskTitleHandler}
                                removeTask={removeHundler}
                                changeCheckboxTask={changeCheckboxHandler}
                                task={tsk}
                                key={tsk.id}
                            />
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
})


