import React from 'react';
import {FilterType, TaskType} from "./App";

type TodolistType = {
    header: string
    tasks: Array<TaskType>
    removeTask:(idTask:number)=>void
    filterTasks:(valueButtonFilter:FilterType)=>void
}

export function Todolist(props: TodolistType) {

    const removeHundler = (idTask:number) => {
      props.removeTask(idTask)
    }

    const filterTasksHandler = (valueButtonFilter:FilterType) => {
      props.filterTasks(valueButtonFilter)
    }

    return (
        <div>
            <div>
                <h3>{props.header}</h3>
                <div>
                    <input/>
                    <button>new task</button>
                </div>
                <ul>
                    {
                        props.tasks.map(tsk => {
                            return (
                                <li key={tsk.id}>
                                    <input
                                        type="checkbox"
                                        checked={tsk.isDone}
                                    />
                                    <span>{tsk.title}</span>
                                    <button onClick={()=>removeHundler(tsk.id)}>remove</button>
                                </li>
                            )
                        })
                    }
                </ul>
                <div>
                    <button onClick={()=>filterTasksHandler('all')}>ALL</button>
                    <button onClick={()=>filterTasksHandler('yes')}>YES</button>
                    <button onClick={()=>filterTasksHandler('no')}>NO</button>
                </div>
            </div>
        </div>
    );
}


