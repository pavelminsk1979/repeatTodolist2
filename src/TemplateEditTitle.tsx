import {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

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
            ?  <TextField
            size={"small"}
                onBlur={editTitleHandler}
                autoFocus
                onChange={setEditTitleHandler}
                value={editTitle}
                id="standard-basic"
                label="do edit" />

            :<span onDoubleClick={onDoubleClickHandler}> {props.title}</span>
    )
}