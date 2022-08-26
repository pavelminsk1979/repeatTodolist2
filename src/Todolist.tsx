import React from 'react';
import {FilterType, TaskType} from "./App";
import st from './Todolist.module.css';
import {TemplateCreatingTaskTudulist} from "./TemplateCreatingTaskTudulist";
import {TemplateEditTitle} from "./TemplateEditTitle";

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
    editTaskTitle: (idTodol: string,idTask: string,editTitle: string) => void
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
      props.editTaskTitle(props.todolistId,idTask,editTitle)
    }


    return (
        <div>
            <div>
                <h3>
                    <TemplateEditTitle
                        callback={editTodolistTitleHandler}
                        title={props.header}
                    />

                    <button onClick={removeTodolistHandler}>del</button>
                </h3>

                <TemplateCreatingTaskTudulist
                    name={'new task'}
                    callback={addedTaskHandler}
                />
                <ul>
                    {
                        props.tasks.map(tsk => {
                            return (
                                <li key={tsk.id}>
                                    <input
                                        onChange={(event) =>
                                            changeCheckboxHandler(tsk.id,
                                                event.currentTarget.checked)}
                                        type="checkbox"
                                        checked={tsk.isDone}
                                    />
                                    <TemplateEditTitle
                                        title={tsk.title}
                                        callback={
                                            (editTitle: string) => editTaskTitleHandler(
                                                tsk.id, editTitle)}/>
                                    <button onClick={() => removeHundler(tsk.id)}>remove</button>
                                </li>
                            )
                        })
                    }
                </ul>
                <div>
                    <button className={props.filterValue === 'all' ? st.buttonFilter : ''}
                            onClick={() => filterTasksHandler(
                                props.todolistId, 'all')}>ALL
                    </button>
                    <button className={props.filterValue === 'yes' ? st.buttonFilter : ''}
                            onClick={() => filterTasksHandler(
                                props.todolistId, 'yes')}>YES
                    </button>
                    <button className={props.filterValue === 'no' ? st.buttonFilter : ''}
                            onClick={() => filterTasksHandler(
                                props.todolistId, 'no')}>NO
                    </button>
                </div>
            </div>
        </div>
    );
}


