import {combineReducers, legacy_createStore} from "redux";
import {taskReduser} from "../Reducer/TaskReduser";
import {todolistReduser} from "../Reducer/TodolistReduser";


const rootReduser=combineReducers({
    tasks:taskReduser,
    todolists:todolistReduser,
})

export const store=legacy_createStore(rootReduser)

export type ReduxStoreStateType=ReturnType<typeof rootReduser>

// @ts-ignore
window.store=store