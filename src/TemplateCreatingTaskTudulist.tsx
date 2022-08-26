import st from "./Todolist.module.css";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";


type TemplateCreatingTaskTudulistType={
    callback:(text: string)=>void
    name:string
}

export const TemplateCreatingTaskTudulist = (props:TemplateCreatingTaskTudulistType) => {

    const [text, setText] = useState('')
    const [inputRed, setInputRed] = useState<string | null>(null)

    const inputStateForText = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.currentTarget.value)
        setInputRed(null)
    }

    const EnterForAddedTask = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addedTaskHandler()
        }
    }

    const addedTaskHandler = () => {
        if (text.trim() !== '') {
            props.callback(text.trim())
        }else {setInputRed('Text requaried!')}
        setText('')
    }

  return(
      <div>
        <input
            className={inputRed?st.redInput:''}
            onKeyPress={EnterForAddedTask}
            value={text}
            onChange={inputStateForText}
        />
        <button onClick={addedTaskHandler}>
            {props.name}
        </button>
        {inputRed&&<div className={st.redAllert}>{inputRed}</div>}
      </div>
  )
}