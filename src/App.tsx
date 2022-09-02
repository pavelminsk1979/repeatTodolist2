import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {TemplateCreatingTaskTudulist} from "./TemplateCreatingTaskTudulist";
import {AppBarComponent} from "./AppBar";
import {Container, Grid, Paper} from "@material-ui/core";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = 'all' | 'yes' | 'no'

export type TodolistsStateType = {
    id: string
    title: string
    filter: FilterType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todolist1 = v1()
    const todolist2 = v1()
    const [todolists, setTodolist] = useState<Array<TodolistsStateType>>([
        {id: todolist1, title: 'What to do', filter: 'all'},
        {id: todolist2, title: 'What to buy', filter: 'yes'}
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
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


    const editTodolistTitle = (idTodol: string, editTitle: string) => {
        setTodolist(todolists.map(el => el.id === idTodol
            ? {...el, title: editTitle} : el))
    }

    const addedTodolistHandler = (text: string) => {
        const newTodolist1 = v1()
        setTodolist([{id: newTodolist1, title: text, filter: 'all'}, ...todolists])
        setTasks({...tasks, [newTodolist1]: []})
    }

    const removeTodolist = (idTodol: string) => {
        setTodolist(todolists.filter(e => e.id !== idTodol))
        delete tasks[idTodol]
        setTasks({...tasks})
    }

    const statusFilterForTudulist = (idTodol: string, valueButtonFilter: FilterType) => {
        setTodolist(todolists.map(el => el.id === idTodol
            ? {...el, filter: valueButtonFilter} : el))
    }


    const changeCheckboxTask = (idTodol: string, idTask: string, isDone: boolean) => {
        setTasks({
            ...tasks, [idTodol]: tasks[idTodol].map(
                el => el.id === idTask ? {...el, isDone} : el
            )
        })
    }


    const editTaskTitle = (idTodol: string, idTask: string, editTitle: string) => {
        setTasks({
            ...tasks, [idTodol]: tasks[idTodol].map(
                el => el.id === idTask ? {...el, title: editTitle} : el)
        })
    }

    const addedTask = (idTodol: string, text: string) => {
        setTasks({
            ...tasks, [idTodol]: [
                {id: v1(), title: text, isDone: true}, ...tasks[idTodol]]
        })
    }

    const removeTask = (idTodol: string, idTask: string) => {
        setTasks({
            ...tasks, [idTodol]: tasks[idTodol].filter(
                el => el.id !== idTask)
        })
    }




    return (
        <div className="App">
            <AppBarComponent/>
            <Container fixed>
                <Grid container style={{padding:'20px'}}>

                    <TemplateCreatingTaskTudulist
                        name={'new todolist'}
                        callback={addedTodolistHandler}
                    />
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(todol => {

                            let tasksAfterFilter = tasks[todol.id]
                            if (todol.filter === 'yes') {
                                tasksAfterFilter = tasksAfterFilter.filter(el => el.isDone)
                            }
                            if (todol.filter === 'no') {
                                tasksAfterFilter = tasksAfterFilter.filter(el => !el.isDone)
                            }

                            return <Grid item>
                                <Paper style={{padding:'15px'}}>
                                <Todolist
                                    editTaskTitle={editTaskTitle}
                                    editTodolistTitle={editTodolistTitle}
                                    removeTodolist={removeTodolist}
                                    todolistId={todol.id}
                                    key={todol.id}
                                    filterValue={todol.filter}
                                    changeCheckboxTask={changeCheckboxTask}
                                    addedTask={addedTask}
                                    statusFilterForTudulist={statusFilterForTudulist}
                                    removeTask={removeTask}
                                    header={todol.title}
                                    tasks={tasksAfterFilter}
                                />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
