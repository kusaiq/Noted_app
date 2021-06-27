import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
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
//import { config } from 'dotenv';
//"proxy": "http://localhost:5000"
const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),//vanilla js to get the token from the web browser local storage
        isAuthenticated: localStorage.getItem('isAuthenticated'),
        loading: true,
        user: localStorage.getItem('user'),
        error: null
    };
    const [state, dispatch] = useReducer(authReducer, initialState);


    // Load User
    const LoadUser = async () => {
        // we want to set our token into a global header .because its a private route we need to set a token
        //and load token to the header
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get('http://localhost:5000/api/v1/auth/me');

            dispatch({
                type: USER_LOADED,
                payLoad: res.data.data.name
            })
        } catch (err) {
            //console.log(err.response.data.error)
            dispatch({
                type: AUTH_ERROR,
                payLoad: err.response.data.error //to understand this just console.log one object at the time ok

            })
            console.log(err.response.data.error)
        }
    }
    // Register User
    const Register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('http://localhost:5000/api/v1/auth/register', formData, config);

            dispatch({
                type: REGISTER_SUCCESS,
                payLoad: res.data

            })
            LoadUser();
        } catch (err) {
            //console.log(err.response.data.error)
            dispatch({
                type: REGISTER_FAIL,
                payLoad: err.response.data.error //to understand this just console.log one object at the time ok

            })
        }
    }
    // Login User
    const Login = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('http://localhost:5000/api/v1/auth/login', formData, config);

            dispatch({
                type: LOGIN_SUCCESS,
                payLoad: res.data

            })
            
            LoadUser();
        } catch (err) {
            //console.log(err.response.data.error)
            dispatch({
                type: LOGIN_FAIL,
                payLoad: err.response.data.error //to understand this just console.log one object at the time ok

            })
        }
    }
    // Logout
    // Login User
    const Logout = () => dispatch({ type: LOGOUT });

    // Clear Errors
    const clearErrors= () => {
        dispatch({ type: CLEAR_ERRORS, payLoad:null })
    }
    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            Register,
            LoadUser,
            Login,
            Logout,
            clearErrors
                
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;