import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';

import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types';
//"proxy": "http://localhost:5000"
const AlertState = props => {
    const initialState = [];//it can be an array of objects but we are gonna use this time a list
    const [state, dispatch] = useReducer(alertReducer, initialState);
    


    const setAlert = (msg, type, timeout  ) => {
        const id = uuidv4();
        dispatch({
            type: SET_ALERT,
            payLoad: { msg, type, id },
        });
        setTimeout(() => dispatch({ type: REMOVE_ALERT, payLoad: id }), timeout)
    }
    
        


    return (
        <AlertContext.Provider value={{
            alerts: state,
            setAlert,

        }}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState;