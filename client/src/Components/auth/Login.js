import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

const Login = () => {

    const authContext = useContext(AuthContext);

    const { login } = authContext

    const [auth, setAuth] = useState({
        email: '',
        password: "",
    })
    const {  email, password  } = auth;

    const onChange = e =>
        setAuth({ ...auth, [e.target.name]: e.target.value })

    const onSubmit = (event) => {
        event.preventDefault();
    }

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
                    required
                />
            </div>

            <div className="form-group">
                <label className="lable-forum" htmlFor='password'>password</label>
                <input className="form-group"
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
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