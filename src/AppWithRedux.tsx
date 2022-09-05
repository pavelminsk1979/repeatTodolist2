import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {TemplateCreatingTaskTudulist} from "./TemplateCreatingTaskTudulist";
import {AppBarComponent} from "./AppBar";
import {Container, Grid, Paper} from "@material-ui/core";
import {
    statusFilterForTudulistAC,
    todolistAddedAC,
    todolistEditTitleAC,
    todolistRemoveAC
} from "./Reducer/TodolistReduser";
import {addedTaskAC, changeCheckboxTaskAC, editTitleTaskAC, removeTaskAC} from "./Reducer/TaskReduser";
import {useDispatch, useSelector} from "react-redux";
import {ReduxStoreStateType} from "./Redux/Store";


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

function AppWithRedux() {

    const todolists = useSelector<ReduxStoreStateType, Array<TodolistsStateType>>(state => state.todolists)

    const tasks = useSelector<ReduxStoreStateType, TasksStateType>(
        state => state.tasks)

    const dispatch=useDispatch()


    const editTodolistTitle = (idTodol: string, editTitle: string) => {
        dispatch(todolistEditTitleAC(idTodol, editTitle))
    }

    const addedTodolistHandler = (text: string) => {
        dispatch(todolistAddedAC(text))
    }

    const removeTodolist = (idTodol: string) => {
        dispatch(todolistRemoveAC(idTodol))
    }

    const statusFilterForTudulist = (idTodol: string, valueButtonFilter: FilterType) => {
        dispatch(statusFilterForTudulistAC(idTodol, valueButtonFilter))
    }


    const changeCheckboxTask = (idTodol: string, idTask: string, isDone: boolean) => {
        /*debugger*/
        dispatch(changeCheckboxTaskAC(idTodol, idTask, isDone))
    }


    const editTaskTitle = (idTodol: string, idTask: string, editTitle: string) => {
        dispatch(editTitleTaskAC(idTodol, idTask, editTitle))
    }

    const addedTask = (idTodol: string, text: string) => {
        dispatch(addedTaskAC(idTodol, text))
    }

    const removeTask = (idTodol: string, idTask: string) => {
        dispatch(removeTaskAC(idTodol, idTask))
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

export default AppWithRedux;
