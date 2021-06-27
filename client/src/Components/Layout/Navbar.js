import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';


const Navbar = () => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, Logout, user } = authContext;

    const guestLinks = (
        <Fragment>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
            <li >
                <Link to='/'>
                    home
                </Link>
            </li>
        </Fragment>
    );
    const onLogout = () => {
        Logout();
    };
    const authLinks = (
        <Fragment>
            {<li>
                Hello {`${user}`}
                </li>
            }
            <li>
                <a onClick={onLogout} href='/login'>
                    <i className='fas fa-sign-out-alt' />{' '}
                    <span className='hide-sm'>Logout</span>
                </a>
            </li>
            <li >
                <Link to='/'>
                    home
                </Link>
            </li>
        </Fragment>
    );
    return (
         
        <div className="navbar bg-primary">
            <h1>
                <Link to='/'>
                    <i className="fas fa-journal-whills"></i>
                </Link>
            </h1>
            <ul >{localStorage.isAuthenticated? authLinks : guestLinks}
               
                </ul>
            </div>
    )
}
export default Navbar;