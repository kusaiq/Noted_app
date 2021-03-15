import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

const Register = () => {

    const authContext = useContext(AuthContext);

    const { Register } = authContext

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        password2:""
    })  
    const { name, email, password, password2 } = user;

    const onChange = e =>
        setUser({ ...user, [e.target.name]: e.target.value }) 

    const onSubmit = (event) => {
        event.preventDefault();
        Register({
            name,
            email,
            password
        });
        
    }

    return (

        <form className="form-container" onSubmit={onSubmit}>
            <h1>
                <span className="text-primary">Create </span>
                account
                </h1>
            <div className="form-group">

                <label className="lable-forum" htmlFor='name'>Name</label>
            <input className="form-group"
                type="text"

                name="name"
                value={name}
                onChange={onChange}
                required
                />
            </div>

            <div className="form-group">
            <label className="lable-forum" htmlFor='email'>Email</label>
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
            <div style={{ display: 'inline-block' }}>
                <i class="fas fa-exclamation-circle"></i>
                <div style={{ display: 'inline-block' }}>
                     Passwords must be at least 6 characters.
                </div>
                </div>

            <div className="form-group">
                <label className="lable-forum" htmlFor='password2'>Re-enter password</label>
            <input 
                type="password"
                name="password2"
                value={password2}
                onChange={onChange}
                required
                minLength='6'
                />
                </div>
           
           
            <div>

                <input className="btn btn-primary btn-block " type="submit"
                    value={"Register"} />

            </div>

        </form>

    )
}




export default Register;