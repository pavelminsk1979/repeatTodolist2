import React from 'react';
import {TaskType} from "./App";

type TodolistType = {
    header: string
    tasks: Array<TaskType>
}

export function Todolist(props: TodolistType) {
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
                                </li>
                            )
                        })
                    }
                </ul>
                <div>
                    <button>ALL</button>
                    <button>YES</button>
                    <button>NO</button>
                </div>
            </div>
        </div>
    );
}


