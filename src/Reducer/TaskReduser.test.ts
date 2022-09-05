
import {addedTaskAC, changeCheckboxTaskAC, editTitleTaskAC, removeTaskAC, taskReduser} from "./TaskReduser";
import {todolistAddedAC, todolistRemoveAC} from "./TodolistReduser";
import {TasksStateType} from "../AppWithReduser";


let startState: TasksStateType

beforeEach(()=>{
     startState = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }
})


test('correct task should be deleted from correct array',()=>{


const endState=taskReduser(startState,removeTaskAC('todolistId1','2'))

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    })

})

test('correct task should be added to correct array',()=>{


    const newTaskTitle:string='HTML'
const endState=taskReduser(startState,addedTaskAC('todolistId1',newTaskTitle))

    expect(endState['todolistId1'].length).toBe(4)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId1'][0].title).toBe('HTML')
    expect(endState['todolistId1'][0].id).toBeDefined()
    expect(endState['todolistId1'][0].isDone).toBe(false)

})


test('status of specified task should be changed',()=>{



const endState=taskReduser(startState,changeCheckboxTaskAC('todolistId1','1',true))

    expect(endState['todolistId1'][0].isDone).toBe(true)
    expect(endState['todolistId2'][0].isDone).toBe(false)
})


test('title task should cange',()=>{



const endState=taskReduser(startState,editTitleTaskAC('todolistId1','2','HTML'))

    expect(endState['todolistId1'][1].title).toBe('HTML')
    expect(endState['todolistId2'][1].title).toBe('milk')
})


test('new array should be added when new todolist is added',()=>{

    const text='New Cool Todolist'
const endState=taskReduser(startState,todolistAddedAC(text))

  const keys=Object.keys(endState)

    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolist should be deleted',()=>{



const endState=taskReduser(startState,todolistRemoveAC('todolistId1'))

  const keys=Object.keys(endState)


    expect(keys.length).toBe(1)
    expect(endState['todolistId1']).not.toBeDefined()
})