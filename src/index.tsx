import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createTheme, CssBaseline, ThemeProvider} from "@material-ui/core";
import {blue, blueGrey} from "@material-ui/core/colors";
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./Redux/Store";


const theme=createTheme({
    palette:{
        primary:blueGrey,
        secondary:blue,
        type:'dark'
    }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
    <ThemeProvider theme={theme}>
        <CssBaseline/>
    <AppWithRedux />
    </ThemeProvider>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
