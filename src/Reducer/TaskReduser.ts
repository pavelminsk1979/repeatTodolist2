
import {todolistAddedACType, todolistRemoveACType} from "./TodolistReduser";
import {TasksStateType} from "../AppWithReduser";


type TaskReduserType=removeTaskACType|addedTaskACType|changeCheckboxTaskACType|editTitleTaskACType|todolistAddedACType|todolistRemoveACType

export const taskReduser=(state:TasksStateType,action:TaskReduserType)=>{
    switch(action.type){
        case 'REMOVE-TASK':{
            return {...state,[action.todolId]:state[action.todolId].filter(
                el=>el.id!==action.taskId)}
        }
        case 'ADDED-TASK':{
            return {...state,[action.todolId]:[{
                    id: '0', title:action.newTaskTitle, isDone: false
                },...state[action.todolId]]}

        }
        case 'CHANGE-CHACKBOX-TASK':{
            return{...state,[action.todolId]:state[action.todolId].map(
                el=>el.id===action.taskId ?{...el,isDone:action.isDone}:el)}
        }
        case 'EDIT-TITLE-TASK':{
            return{...state,[action.todolId]:state[action.todolId].map(
                e=>e.id===action.taskId?{...e,title:action.titleTask}:e)}
        }
        case 'ADDED-TODOLIST':{
            return{...state,[action.newIdTodolist]:[]}
        }
        case 'REMOVE-TODOLIST':{
            const copyState={...state}
             delete  copyState[action.todolId]
            return copyState
        }
        default:return state
    }
}

type removeTaskACType=ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolId:string,taskId:string) => {
  return{
      type:'REMOVE-TASK',
      todolId:todolId,
      taskId:taskId
  }as const
}


type addedTaskACType=ReturnType<typeof addedTaskAC>
export const addedTaskAC = (todolId:string,newTaskTitle:string) => {
  return{
      type:'ADDED-TASK',
      todolId,
      newTaskTitle
  }as const
}


type changeCheckboxTaskACType=ReturnType<typeof changeCheckboxTaskAC>
export const changeCheckboxTaskAC = (todolId:string,taskId:string,isDone:boolean) => {
  return{
      type:'CHANGE-CHACKBOX-TASK',
      todolId,
      taskId,
      isDone
  }as const
}


type editTitleTaskACType=ReturnType<typeof editTitleTaskAC>
export const editTitleTaskAC = (todolId:string,taskId:string,titleTask:string) => {
  return{
      type:'EDIT-TITLE-TASK',
      todolId,
      taskId,
      titleTask
  }as const
}