import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TaskType={
    id:number
    title:string
    isDone:boolean
}


function App() {
    const tasks=[
        {id:1,title:'Earn money',isDone:true},
        {id:2,title:'Play football',isDone:false},
        {id:3,title:'Eat food',isDone:true},
        {id:4,title:'Drink vodka',isDone:false},
    ]
    return (
        <div className="App">
            <Todolist
                header={'What to do'}
                tasks={tasks}
            />
        </div>
    );
}

export default App;
