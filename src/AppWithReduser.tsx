import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {TemplateCreatingTaskTudulist} from "./TemplateCreatingTaskTudulist";
import {AppBarComponent} from "./AppBar";
import {Container, Grid, Paper} from "@material-ui/core";
import {
    statusFilterForTudulistAC,
    todolistAddedAC,
    todolistEditTitleAC,
    todolistReduser,
    todolistRemoveAC
} from "./Reducer/TodolistReduser";
import {addedTaskAC, changeCheckboxTaskAC, editTitleTaskAC, removeTaskAC, taskReduser} from "./Reducer/TaskReduser";


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

function AppWithReduser() {
    const todolist1 = v1()
    const todolist2 = v1()
    const [todolists, dispatchTodolist] = useReducer(todolistReduser, [
        {id: todolist1, title: 'What to do', filter: 'all'},
        {id: todolist2, title: 'What to buy', filter: 'yes'}
    ])
    const [tasks, dispatchTasks] = useReducer(taskReduser, {
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
        dispatchTodolist(todolistEditTitleAC(idTodol, editTitle))
    }

    const addedTodolistHandler = (text: string) => {
        const action = todolistAddedAC(text)
        dispatchTodolist(action)
        dispatchTasks(action)
    }

    const removeTodolist = (idTodol: string) => {
        const action = todolistRemoveAC(idTodol)
        dispatchTodolist(action)
        dispatchTasks(action)
    }

    const statusFilterForTudulist = (idTodol: string, valueButtonFilter: FilterType) => {
        dispatchTodolist(statusFilterForTudulistAC(idTodol, valueButtonFilter))
    }


    const changeCheckboxTask = (idTodol: string, idTask: string, isDone: boolean) => {
        dispatchTasks(changeCheckboxTaskAC(idTodol,idTask,isDone))
    }


    const editTaskTitle = (idTodol: string, idTask: string, editTitle: string) => {
        dispatchTasks(editTitleTaskAC(idTodol,idTask,editTitle))
    }

    const addedTask = (idTodol: string, text: string) => {
        dispatchTasks(addedTaskAC(idTodol,text))
    }

    const removeTask = (idTodol: string, idTask: string) => {
        dispatchTasks(removeTaskAC(idTodol,idTask))
    }


    return (
        <div className="App">
            <AppBarComponent/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>

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
                                <Paper style={{padding: '15px'}}>
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

export default AppWithReduser;
