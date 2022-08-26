import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = 'all' | 'yes' | 'no'

type TodolistsStateType = {
    id: string
    title: string
    filter: FilterType
}

function App() {
    const todolist1 = v1()
    const todolist2 = v1()
    const [todolists, setTodolist] = useState<Array<TodolistsStateType>>([
        {id: todolist1, title: 'What to do', filter: 'all'},
        {id: todolist2, title: 'What to buy', filter: 'yes'}
    ])
    const [tasks, setTasks] = useState({
            [todolist1]: [
                {id: v1(), title: 'Earn money', isDone: true},
                {id: v1(), title: 'Play football', isDone: false},
                {id: v1(), title: 'Eat food', isDone: true},
                {id: v1(), title: 'Drink vodka', isDone: false},
            ],
            [todolist2]: [
                {id: v1(), title: 'Red car', isDone: true},
                {id: v1(), title: 'Green dollars', isDone: false},
                {id: v1(), title: 'Black pistolet', isDone: true},

            ],
        }
    )

    const changeCheckboxTask = (idTodol:string,idTask: string, isDone: boolean) => {
        setTasks({...tasks,[idTodol]:tasks[idTodol].map(
            el=>el.id===idTask?{...el,isDone}:el
            )})
    }

    const addedTask = (idTodol:string,text: string) => {
        setTasks({...tasks,[idTodol]:[
                {id: v1(), title: text, isDone: true},...tasks[idTodol]]})
    }

    const removeTask = (idTodol:string,idTask: string) => {
        setTasks({...tasks,[idTodol]:tasks[idTodol].filter(
            el=>el.id!==idTask)})
    }

    const filterTasks = (idTodol: string, valueButtonFilter: FilterType) => {
        setTodolist(todolists.map(el => el.id === idTodol
            ? {...el, filter: valueButtonFilter} : el))
    }


    return (
        <div className="App">
            {
                todolists.map(todol => {

                    let tasksAfterFilter = tasks[todol.id]
                    if (todol.filter === 'yes') {
                        tasksAfterFilter = tasksAfterFilter.filter(el => el.isDone)
                    }
                    if (todol.filter === 'no') {
                        tasksAfterFilter = tasksAfterFilter.filter(el => !el.isDone)
                    }

                    return (
                        <Todolist
                            todolistId={todol.id}
                            key={todol.id}
                            filterValue={todol.filter}
                            changeCheckboxTask={changeCheckboxTask}
                            addedTask={addedTask}
                            filterTasks={filterTasks}
                            removeTask={removeTask}
                            header={todol.title}
                            tasks={tasksAfterFilter}
                        />
                    )
                })
            }

        </div>
    );
}

export default App;
