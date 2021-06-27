import React, { Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Navbar from "./Components/Layout/Navbar"
import Alerts from "./Components/Layout/Alerts"
import Home from "./Components/pages/Home"
import Register from './Components/auth/Register';
import Login from './Components/auth/Login';
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/authState';
import AlertState from './context/alert/AlertState';
import PrivateRoute from './Components/routing/PrivateRoute';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}
const App = () => {

    return (
        <AuthState>
            <ContactState>
                <AlertState>
        <Router>
            <Fragment >
                            <Navbar />
                            <div className="container">
                                <Alerts />
                <Switch>
                                
                                        
                                    <PrivateRoute  exact path='/' component={Home}/>
                                <Route exact path='/register' component={Register}/>
                                    <Route exact path='/login' component={Login} />
                                
                                </Switch>
                            </div>
                                 
            </Fragment>
                    </Router>
                    </AlertState>
                </ContactState>
            </AuthState>

  );
}

export default App;
