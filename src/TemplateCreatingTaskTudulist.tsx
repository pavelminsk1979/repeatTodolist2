import st from "./Todolist.module.css";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@material-ui/core";



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
          <TextField
              className={inputRed?st.redInput:''}
              onKeyPress={EnterForAddedTask}
              value={text}
              onChange={inputStateForText}
              size={'small'}
              id="outlined-basic"
              label="GOLD WORDS"
              variant="outlined"
          />

        <Button
            style={{
                maxWidth: '75px',
                maxHeight: '40px',
                minWidth: '75px',
                minHeight: '40px',
                backgroundColor:'purple',
                color: "white",

            }}
            onClick={addedTaskHandler}>
            {props.name}
        </Button>
        {inputRed&&<div className={st.redAllert}>{inputRed}</div>}
      </div>
  )
}