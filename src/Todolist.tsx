import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from "./App";
import st from './Todolist.module.css';

type TodolistType = {
    header: string
    tasks: Array<TaskType>
    removeTask: (idTask: string) => void
    filterTasks: (valueButtonFilter: FilterType) => void
    addedTask: (text: string) => void
    changeCheckboxTask: (idTask: string, isDone: boolean) => void
    filterValue:FilterType
}

export function Todolist(props: TodolistType) {
    const [text, setText] = useState('')
    const [inputRed, setInputRed] = useState<string | null>(null)

    const inputStateForText = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.currentTarget.value)
        setInputRed(null)
    }

    const addedTaskHandler = () => {
        if (text.trim() !== '') {
            props.addedTask(text.trim())
        }else {setInputRed('Text requaried!')}
        setText('')
    }
    const EnterForAddedTask = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addedTaskHandler()
        }
    }

    const removeHundler = (idTask: string) => {
        props.removeTask(idTask)
    }

    const filterTasksHandler = (valueButtonFilter: FilterType) => {
        props.filterTasks(valueButtonFilter)
    }

    const changeCheckboxHandler = (idTask: string, isDone: boolean) => {
        props.changeCheckboxTask(idTask, isDone)
    }


    return (
        <div>
            <div>
                <h3>{props.header}</h3>
                <div>
                    <input
                        className={inputRed?st.redInput:''}
                        onKeyPress={EnterForAddedTask}
                        value={text}
                        onChange={inputStateForText}
                    />
                    <button onClick={addedTaskHandler}>
                        new task
                    </button>
                    {inputRed&&<div className={st.redAllert}>{inputRed}</div>}
                </div>
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
                                    <span>{tsk.title}</span>
                                    <button onClick={() => removeHundler(tsk.id)}>remove</button>
                                </li>
                            )
                        })
                    }
                </ul>
                <div>
                    <button className={props.filterValue==='all'?st.buttonFilter:''}
                        onClick={() => filterTasksHandler('all')}>ALL</button>
                    <button className={props.filterValue==='yes'?st.buttonFilter:''}
                        onClick={() => filterTasksHandler('yes')}>YES</button>
                    <button className={props.filterValue==='no'?st.buttonFilter:''}
                        onClick={() => filterTasksHandler('no')}>NO</button>
                </div>
            </div>
        </div>
    );
}


