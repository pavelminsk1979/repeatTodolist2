import {v1} from "uuid";
import {
    statusFilterForTudulistAC,
    todolistAddedAC,
    todolistEditTitleAC,
    todolistReduser,
    todolistRemoveAC
} from "./TodolistReduser";
import {TodolistsStateType} from "../AppWithRedux";

let todolist1:string;
let todolist2:string;

let startState:Array<TodolistsStateType>;

beforeEach(()=>{
     todolist1=v1()
    todolist2=v1()

    startState=[
        {id:todolist1,title:'What-WHAT to do',filter:'all'},
        {id:todolist2,title:'What-WHAT to buy',filter:'all'},
    ]
})


test ('correct todolist should be removed',()=>{

    const endState=todolistReduser(startState,todolistRemoveAC(todolist1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolist2)

})

test ('correct todolist should be added',()=>{


const text='New Cool Todolist'
    const endState=todolistReduser(startState,todolistAddedAC(text))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('New Cool Todolist')

})

test ('correct todolist should change its name',()=>{

const newEditTitleTodolist='Edit Title'

    const endState=todolistReduser(startState,todolistEditTitleAC(todolist1,newEditTitleTodolist))

    expect(endState[0].title).toBe('Edit Title')
    expect(endState[1].title).toBe('What-WHAT to buy')

})

test ('correct filter of todolist should be changed ',()=>{

const newFilter='yes'

    const endState=todolistReduser(startState,statusFilterForTudulistAC(todolist1,newFilter))

    expect(endState[0].filter).toBe('yes')
    expect(endState[1].filter).toBe('all')

})