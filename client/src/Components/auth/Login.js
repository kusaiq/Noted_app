import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = (props) => {

    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const { Login, error, isAuthenticated, clearErrors} = authContext;
    const { setAlert } = alertContext
    

    const [auth, setAuth] = useState({
        email: '',
        password: ""
    })
    const {  email, password  } = auth;
    useEffect(() => {
        if (localStorage.getItem('isAuthenticated') ) {
            //redirect to the main page if logged in 
            props.history.push('/')
        }
        if (error  ) {
            setAlert(error, 'danger', '5000');
            clearErrors();
        }
    }, [error, isAuthenticated, props.history])

    const onChange = e =>
        setAuth({ ...auth, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault();
        if (email === '' || password === '') {
            setAlert('Please enter all fields', 'danger', '5000');
        } else {
            Login({
                email,
                password
            });
        }
    };

    return (

        <form className="form-container" onSubmit={onSubmit}>
            <h1>
                Account <span className="text-primary">Login </span>
                </h1>

            <div className="form-group">
                <label className="lable-forum" htmlFor='email'>Email Address</label>
                <input className="form-group"
                    type="text"
                    name="email"
                    value={email}
                    onChange={onChange}
                  
                />
            </div>

            <div className="form-group">
                <label className="lable-forum" htmlFor='password'>password</label>
                <input className="form-group"
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    
                    minLength='6'
                />
            </div>

            <div>

                <input className="btn btn-primary btn-block " type="submit"
                    value={"login"} />
            </div>
        </form>

    )
}




export default Login;