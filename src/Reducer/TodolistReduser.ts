
import {v1} from "uuid";
import {FilterType, TodolistsStateType} from "../AppWithRedux";

type ActionType = todolistRemoveACType|todolistAddedACType|todolistEditTitleACType|statusFilterForTudulistACType

const initialStateTodolist:Array<TodolistsStateType>=[]

export const todolistReduser = (state: Array<TodolistsStateType>=initialStateTodolist, action: ActionType):Array<TodolistsStateType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el=>el.id!==action.todolId)
        }
        case 'ADDED-TODOLIST': {
            return [{id:action.newIdTodolist,title:action.newTodolistTitle,
                filter:'all'},...state]
        }
        case 'EDIT-TITLE-TODOLIST': {
            return state.map(el=>el.id===action.todolId
                ?{...el,title:action.newEditTitleTodolist}:el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el=>el.id===action.todolId
            ?{...el,filter:action.newFilter}:el)
        }
        default:
            return state
    }
}

 export type todolistRemoveACType=ReturnType<typeof todolistRemoveAC>
export const todolistRemoveAC = (todolId:string) => {
  return{
      type:'REMOVE-TODOLIST',
      todolId:todolId
  }as const
}

export type todolistAddedACType=ReturnType<typeof todolistAddedAC>
export const todolistAddedAC = (newTodolistTitle:string) => {
    return{
        type:'ADDED-TODOLIST',
        newTodolistTitle,
        newIdTodolist:v1()
    }as const
}

type todolistEditTitleACType=ReturnType<typeof todolistEditTitleAC>
export const todolistEditTitleAC = (todolId:string,newEditTitleTodolist:string) => {
    return{
        type:'EDIT-TITLE-TODOLIST',
        todolId:todolId,
        newEditTitleTodolist:newEditTitleTodolist
    }as const
}

type statusFilterForTudulistACType=ReturnType<typeof statusFilterForTudulistAC>
export const statusFilterForTudulistAC = (todolId:string,newFilter:FilterType) => {
    return{
        type:'CHANGE-TODOLIST-FILTER',
        todolId:todolId,
        newFilter:newFilter
    }as const
}