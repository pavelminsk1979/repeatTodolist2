import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
export type FilterType='all'|'yes'|'no'


function App() {
    const [tasks, setTasks] = useState([
            {id: 1, title: 'Earn money', isDone: true},
            {id: 2, title: 'Play football', isDone: false},
            {id: 3, title: 'Eat food', isDone: true},
            {id: 4, title: 'Drink vodka', isDone: false},
        ]
    )

    const removeTask = (idTask:number) => {
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
                filterTasks={filterTasks}
                removeTask={removeTask}
                header={'What to do'}
                tasks={tasksAfterFilter}
            />
        </div>
    );
}

export default App;
