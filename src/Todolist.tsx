import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from "./App";
import st from './Todolist.module.css';

type TodolistType = {
    header: string
    tasks: Array<TaskType>
    removeTask: (idTodol:string,idTask: string) => void
    filterTasks: (idTodol:string,valueButtonFilter: FilterType) => void
    addedTask: (idTodol:string,text: string) => void
    changeCheckboxTask: (idTodol:string,idTask: string, isDone: boolean) => void
    filterValue:FilterType
    todolistId:string
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
            props.addedTask(props.todolistId,text.trim())
        }else {setInputRed('Text requaried!')}
        setText('')
    }
    const EnterForAddedTask = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addedTaskHandler()
        }
    }

    const removeHundler = (idTask: string) => {
        props.removeTask(props.todolistId,idTask)
    }

    const filterTasksHandler = (idTodol:string,valueButtonFilter: FilterType) => {
        props.filterTasks(idTodol,valueButtonFilter)
    }

    const changeCheckboxHandler = (idTask: string, isDone: boolean) => {
        props.changeCheckboxTask(props.todolistId,idTask, isDone)
    }


    return (
        <div>
            <div>
                <h3>
                    {props.header}
                    <button>del</button>
                </h3>

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
                        onClick={() => filterTasksHandler(
                            props.todolistId,'all')}>ALL</button>
                    <button className={props.filterValue==='yes'?st.buttonFilter:''}
                        onClick={() => filterTasksHandler(
                            props.todolistId,'yes')}>YES</button>
                    <button className={props.filterValue==='no'?st.buttonFilter:''}
                        onClick={() => filterTasksHandler(
                            props.todolistId,'no')}>NO</button>
                </div>
            </div>
        </div>
    );
}


