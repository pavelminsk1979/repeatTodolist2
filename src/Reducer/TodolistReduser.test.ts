import {v1} from "uuid";
import {TodolistsStateType} from "../App";
import {
    statusFilterForTudulistAC,
    todolistAddedAC,
    todolistEditTitleAC,
    todolistReduser,
    todolistRemoveAC
} from "./TodolistReduser";


test ('correct todolist should be removed',()=>{
    const todolist1=v1()
    const todolist2=v1()

    const startState:Array<TodolistsStateType>=[
        {id:todolist1,title:'What-WHAT to do',filter:'all'},
        {id:todolist2,title:'What-WHAT to buy',filter:'all'},
    ]
    const endState=todolistReduser(startState,todolistRemoveAC(todolist1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolist2)

})

test ('correct todolist should be added',()=>{
    const todolist1=v1()
    const todolist2=v1()

    const newTodolistTitle='New Cool Todolist'

    const startState:Array<TodolistsStateType>=[
        {id:todolist1,title:'What-WHAT to do',filter:'all'},
        {id:todolist2,title:'What-WHAT to buy',filter:'all'},
    ]
    const endState=todolistReduser(startState,todolistAddedAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)

})

test ('correct todolist should change its name',()=>{
    const todolist1=v1()
    const todolist2=v1()

const newEditTitleTodolist='Edit Title'

    const startState:Array<TodolistsStateType>=[
        {id:todolist1,title:'What-WHAT to do',filter:'all'},
        {id:todolist2,title:'What-WHAT to buy',filter:'all'},
    ]
    const endState=todolistReduser(startState,todolistEditTitleAC(todolist1,newEditTitleTodolist))

    expect(endState[0].title).toBe('Edit Title')
    expect(endState[1].title).toBe('What-WHAT to buy')

})

test ('correct filter of todolist should be changed ',()=>{
    const todolist1=v1()
    const todolist2=v1()

const newFilter='yes'

    const startState:Array<TodolistsStateType>=[
        {id:todolist1,title:'What-WHAT to do',filter:'all'},
        {id:todolist2,title:'What-WHAT to buy',filter:'all'},
    ]
    const endState=todolistReduser(startState,statusFilterForTudulistAC(todolist1,newFilter))

    expect(endState[0].filter).toBe('yes')
    expect(endState[1].filter).toBe('all')

})