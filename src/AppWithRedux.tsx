import React, {useCallback} from 'react';
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


    const editTodolistTitle =useCallback( (idTodol: string, editTitle: string) => {
        dispatch(todolistEditTitleAC(idTodol, editTitle))
    },[dispatch])

    const addedTodolistHandler = useCallback((text: string) => {
        dispatch(todolistAddedAC(text))
    },[dispatch])

    const removeTodolist =useCallback( (idTodol: string) => {
        dispatch(todolistRemoveAC(idTodol))
    },[dispatch])
    const statusFilterForTudulist =useCallback((idTodol: string, valueButtonFilter: FilterType) => {
        dispatch(statusFilterForTudulistAC(idTodol, valueButtonFilter))
    },[dispatch])


    const changeCheckboxTask =useCallback( (idTodol: string, idTask: string, isDone: boolean) => {
        dispatch(changeCheckboxTaskAC(idTodol, idTask, isDone))
    },[dispatch])


    const editTaskTitle =useCallback( (idTodol: string, idTask: string, editTitle: string) => {
        dispatch(editTitleTaskAC(idTodol, idTask, editTitle))
    },[dispatch])

    const addedTask = useCallback((idTodol: string, text: string) => {
        dispatch(addedTaskAC(idTodol, text))
    },[dispatch])

    const removeTask =useCallback( (idTodol: string, idTask: string) => {
        dispatch(removeTaskAC(idTodol, idTask))
    },[dispatch])


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
                                        tasks={tasks[todol.id]}
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
