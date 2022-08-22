import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType='all'|'yes'|'no'


function App() {
    const [tasks, setTasks] = useState([
            {id: v1(), title: 'Earn money', isDone: true},
            {id: v1(), title: 'Play football', isDone: false},
            {id: v1(), title: 'Eat food', isDone: true},
            {id: v1(), title: 'Drink vodka', isDone: false},
        ]
    )

    const changeChecboxTask = (idTask:string,isDone:boolean) => {
        setTasks(tasks.map(el=>el.id===idTask
        ?{...el,isDone}:el))
    }

    const addedTask=(text:string)=>{
        setTasks([{id: v1(),title: text,isDone: false},...tasks])
    }

    const removeTask = (idTask:string) => {
        setTasks(tasks.filter(t=>t.id!==idTask))
    }

    const[filter,setFilter]=useState<FilterType>('all')
    const filterTasks = (valueButtonFilter:FilterType) => {
        setFilter(valueButtonFilter)
    }
    let tasksAfterFilter=tasks
    if(filter==='yes'){tasksAfterFilter=tasks.filter(el=>el.isDone)}
    if(filter==='no'){tasksAfterFilter=tasks.filter(el=>!el.isDone)}

    return (
        <div className="App">
            <Todolist
                changeChecboxTask={changeChecboxTask}
                addedTask={addedTask}
                filterTasks={filterTasks}
                removeTask={removeTask}
                header={'What to do'}
                tasks={tasksAfterFilter}
            />
        </div>
    );
}

export default App;
