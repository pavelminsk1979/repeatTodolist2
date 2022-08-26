import {ChangeEvent, useState} from "react";

type TemplateEditTitleType = {
    title:string
    callback:(editTitle:string)=>void
}

export const TemplateEditTitle = (props: TemplateEditTitleType) => {
    const [toggleForEdit, setToggleForEdit] = useState(false)
    const[editTitle,setEditTitle]=useState(props.title)
    
    const editTitleHandler = () => {
        props.callback(editTitle)
        setToggleForEdit(false)
    }

    const setEditTitleHandler = (event:ChangeEvent<HTMLInputElement>) => {
        setEditTitle(event.currentTarget.value)
    }

    const onDoubleClickHandler = () => {
        setToggleForEdit(true)
    }

    return (
        toggleForEdit
            ? <input
            onBlur={editTitleHandler}
            autoFocus
            onChange={setEditTitleHandler}
                value={editTitle}/>
            :<span onDoubleClick={onDoubleClickHandler}> {props.title}</span>
    )
}