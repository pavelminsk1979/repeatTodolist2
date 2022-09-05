import {Checkbox, IconButton} from "@material-ui/core";
import {TemplateEditTitle} from "./TemplateEditTitle";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import React, {memo} from "react";
import {TaskType} from "./AppWithRedux";

type TaskComponentType = {
    task: TaskType
    changeCheckboxTask: (idTask: string, isDone: boolean) => void
    removeTask: (idTask: string) => void
    editTaskTitle: (idTask: string, editTitle: string) => void
}

export const Task = memo(({task, changeCheckboxTask, removeTask, editTaskTitle}: TaskComponentType) => {
    console.log('task')
    const changeCheckboxHandler = (idTask: string, isDone: boolean) => {
        changeCheckboxTask(idTask, isDone)
    }

    const removeHundler = (idTask: string) => {
        removeTask(idTask)
    }

    const editTaskTitleHandler = (idTask: string, editTitle: string) => {
        editTaskTitle(idTask, editTitle)
    }

    return (
        <div>
            <Checkbox
                style={{
                    color: "sienna",
                }}
                size={"small"}
                onChange={(event) =>
                    changeCheckboxHandler(task.id,
                        event.currentTarget.checked)}
                checked={task.isDone}
                defaultChecked
                inputProps={{'aria-label': 'secondary checkbox'}}
            />
            <TemplateEditTitle
                title={task.title}
                callback={
                    (editTitle: string) => editTaskTitleHandler(
                        task.id, editTitle)}/>
            <IconButton
                style={{
                    color: "crimson",
                }}
                size="small"
                onClick={() => removeHundler(task.id)}>
                <DeleteSweepIcon/>
            </IconButton>
        </div>
    )
})