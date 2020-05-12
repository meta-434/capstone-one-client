import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Nav from './Components/Nav.js';
import Login from './Components/Login.js';
import Main from './Components/Main.js';
import Notes from './Components/Notes.js';
import Sessions from './Components/Sessions.js';
import Timer from './Components/Timer.js';
import PomodoroContext from './PomodoroContext';

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
              <Route path="/timer" component={Timer}/>
              <Route path="/login" component={Login}/>
              <Route path="/sessions" component={Sessions}/>
              <Route path="/notes" component={Notes}/>
            </main>
          </div>
        </PomodoroContext.Provider>
    );
  }

}

export default App;