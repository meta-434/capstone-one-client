import React, { Component } from 'react';
import PomodoroContext from "../../PomodoroContext";
import { Link } from "react-router-dom";
import './Nav.css';

class Nav extends Component {
    static contextType = PomodoroContext;

    logOut = () => {
        this.context.logOut();
        this.props.history.push('/');
    }

    render() {
        return(
        <nav>
            <h1 className="nav-h1"><Link to='/'>Pomodoro Timer</Link></h1>
            {(!!this.context.authToken || sessionStorage[`access-token`])
                ? <>
                    <p>Welcome, {sessionStorage[`username`] || this.context.username}</p>
                    <button><Link to='/timer'>Timer</Link></button>
                    <button><Link to='/sessions/'>Sessions</Link></button>
                    <button><Link to='/notes/'>Notes</Link></button>
                    <button className="logout" onClick={this.logOut}>Log Out</button>
                </>
                : <>
                    <button><Link to='/timer'>Timer</Link></button>
                    <button><Link to='/login'>Log In</Link></button>
                    <button><Link to='/signup'>Sign Up</Link></button>
                </>
            }
        </nav>
        );
    }
}

export default Nav;