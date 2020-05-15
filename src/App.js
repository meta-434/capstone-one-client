import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Nav from './Components/Nav.js';
import Login from './Components/Login.js';
import Signup from './Components/Signup.js';
import Main from './Components/Main.js';
import Notes from './Components/Notes.js';
import Sessions from './Components/Sessions.js';
import TimerComponent from './Components/TimerComponent.js';
import PomodoroContext from './PomodoroContext';
import './App.css'

class App extends Component {
  state = {
    sessions: [],
    notes: []
  }

  //include all your CRUD here and include in context

  render () {
    const { sessions, notes } = this.state;
    const context = {
      sessions,
      notes,
      // CRUD METHODS
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