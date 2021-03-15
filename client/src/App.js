import React, { Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css'
import Navbar from "./Components/Layout/Navbar"
import Home from "./Components/pages/Home"
import About from "./Components/pages/About"
import Register from './Components/auth/Register';
//import Login from './components/auth/Login';working on it
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/authState';
const  App= ()=> {
    return (
        <AuthState>
            <ContactState>
        <Router>
            <Fragment >
                <Navbar />
                <Switch>
                    <div className="container">
                    <Route exact path='/' component={Home}/>
                                <Route exact path='/about' component={About} />
                                <Route exact path='/register' component={Register}/>
                        </div>
                    </Switch>
            </Fragment>
                </Router>
                </ContactState>
            </AuthState>

  );
}

export default App;
