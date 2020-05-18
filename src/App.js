import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Nav from './components/Nav.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import Main from './components/Main.js';
import Notes from './components/Notes.js';
import Sessions from './components/Sessions.js';
import TimerComponent from './components/TimerComponent.js';
import PomodoroContext from './PomodoroContext';
import './App.css'

class App extends Component {
  state = {
    sessions: [],
    notes: []
  }

  //include all your CRUD here and include in context
  handlePostAuthenticate = ({ username, password }) => {
    fetch(process.env.REACT_APP_SERVER_URL + `/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    })
        .catch(error => console.error(error));
  };

  render () {
    const { sessions, notes } = this.state;
    const context = {
      sessions,
      notes,
      handlePostAuthenticate: this.handlePostAuthenticate,
    }
    return (
        <PomodoroContext.Provider value={(context)}>
          <div className="app">
            <Route component={Nav} />
            <main className="app-content">
              <Route exact path="/" component={Main} />
              <Route path="/timer" component={TimerComponent}/>
              <Route path="/login" component={Login}/>
              <Route path="/signup" component={Signup} />
              <Route path="/sessions/:sessionId" component={Sessions}/>
              <Route path="/notes/:noteId" component={Notes}/>
            </main>
          </div>
        </PomodoroContext.Provider>
    );
  }
}

export default App;