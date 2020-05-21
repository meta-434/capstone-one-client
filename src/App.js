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
    notes: [],
    error: undefined,
  }

  logOut = () => {
    this.setState({authToken: undefined});
    sessionStorage.clear();
  }



  handlePostSignup = ({ username, password }) => {
    console.log('signup placeholder');

  }

  handlePostAuthenticate = ({ username, password }) => {
      this.setState({ authToken: username })
      sessionStorage.setItem('access-token', 'abc');
      sessionStorage.setItem('username', username);
      this.handleGetSessions();
      this.handleGetNotes();
  }

  handlePostSession = ({session_name, session_description, ownerId}) => {
      const newSession = {session_name, session_description, ownerId};
      const currentSessions = this.state.sessions;
      currentSessions.push(newSession)
      this.setState({sessions: currentSessions});
  }

  handleGetSessions = () => {
    return this.state.sessions;
  }

  handleDeleteSession = (session_name) => {
    const { sessions } = this.state;
    const filteredSessions = sessions.filter(session => session.session_name !== session_name);
    this.setState({sessions: filteredSessions})
  }

  handlePostNote = ({note_name, note_content, ownerId}) => {
      const newNote = {note_name, note_content, ownerId};
      const currentNotes = this.state.notes;
      currentNotes.push(newNote)
      this.setState({notes: currentNotes});
  }

  handleGetNotes = () => {
    return this.state.notes;
  }

  handleDeleteNote = (note_name) => {
      const { notes } = this.state;
      const filteredNotes = notes.filter(note => note.note_name !== note_name);
      console.log(filteredNotes);
      this.setState({notes: filteredNotes})
  }

  render () {
    const { sessions, notes, authToken, username, error } = this.state;
    const context = {
      sessions,
      notes,
      username,
      authToken,
      error,
      handlePostAuthenticate: this.handlePostAuthenticate,
      handlePostSignup: this.handlePostSignup,
      logOut: this.logOut,
      handleGetNotes: this.handleGetNotes,
      handlePostNote: this.handlePostNote,
      handleDeleteNote: this.handleDeleteNote,
      handleGetSessions: this.handleGetSessions,
      handleDeleteSession: this.handleDeleteSession,
      handlePostSession: this.handlePostSession,
    }
    return (
        <PomodoroContext.Provider value={(context)}>
          <div className="app">
            <Route path="/" render={routeProps => <Nav {...routeProps}/>}/>
            <main className="app-content">
              <Route exact path="/" component={Main} />
              <Route path="/login" component={Login}/>
              <Route path="/signup" component={Signup} />
              <Route path="/timer" component={TimerComponent}/>
              <Route path="/sessions/:sessionId?" component={Sessions}/>
              <Route path="/notes/:noteId?" component={Notes}/>

            </main>
          </div>
        </PomodoroContext.Provider>
    );
  }
}

export default App;