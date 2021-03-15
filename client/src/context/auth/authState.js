import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';
//"proxy": "http://localhost:5000"
const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),//vanilla js to get the token from the web browser local storage
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    };
    const [state, dispatch] = useReducer(authReducer, initialState);
    // Load User

    // Register User
    const Register = async formData => {
        const config  = {
            headers: {
                'Content-Type': 'application/json'
        }
    } 
            try {
                const res = await axios.post('http://localhost:5000/api/v1/auth/register', formData, config );

                dispatch({
                    type: REGISTER_SUCCESS, payLoad: res.data
                    
                })
                console.log(res.data)
            } catch (error) {
                dispatch({
                    type: REGISTER_FAIL, payLoad: error

                })
            }
        
        
    }

    // Login User


    // Logout


    // Clear Errors

    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            Register
           
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;