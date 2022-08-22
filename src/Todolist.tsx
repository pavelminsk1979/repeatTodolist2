import React, {ChangeEvent, useState} from 'react';
import {FilterType, TaskType} from "./App";

type TodolistType = {
    header: string
    tasks: Array<TaskType>
    removeTask: (idTask: string) => void
    filterTasks: (valueButtonFilter: FilterType) => void
    addedTask: (text: string) => void
    changeChecboxTask: (idTask: string, isDone: boolean) => void
}

export function Todolist(props: TodolistType) {
    const [text, setText] = useState('')

    const inputStateForText = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.currentTarget.value)
    }

    const addedTaskHandler = () => {
        if (text.trim() !== '') {
            props.addedTask(text.trim())
        }
        setText('')
    }

    const removeHundler = (idTask: string) => {
        props.removeTask(idTask)
    }

    const filterTasksHandler = (valueButtonFilter: FilterType) => {
        props.filterTasks(valueButtonFilter)
    }

    const changeCheckboxHandler = (idTask: string, isDone: boolean) => {
        props.changeChecboxTask(idTask, isDone)
    }

    return (
        <div>
            <div>
                <h3>{props.header}</h3>
                <div>
                    <input
                        value={text}
                        onChange={inputStateForText}
                    />
                    <button onClick={addedTaskHandler}>
                        new task
                    </button>
                </div>
                <ul>
                    {
                        props.tasks.map(tsk => {
                            return (
                                <li key={tsk.id}>
                                    <input
                                        onChange={(event)=>
                                        changeCheckboxHandler(tsk.id,
                                            event.currentTarget.checked)}
                                        type="checkbox"
                                        checked={tsk.isDone}
                                    />
                                    <span>{tsk.title}</span>
                                    <button onClick={() => removeHundler(tsk.id)}>remove</button>
                                </li>
                            )
                        })
                    }
                </ul>
                <div>
                    <button onClick={() => filterTasksHandler('all')}>ALL</button>
                    <button onClick={() => filterTasksHandler('yes')}>YES</button>
                    <button onClick={() => filterTasksHandler('no')}>NO</button>
                </div>
            </div>
        </div>
    );
}


