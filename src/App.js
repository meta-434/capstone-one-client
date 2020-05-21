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
    authToken: 'abc',
    error: undefined,
  }

  logOut = () => {
    this.setState({authToken: undefined});
    sessionStorage.clear();
  }

  handlePostSignup = ({ username, password }) => {
    fetch(process.env.REACT_APP_SERVER_URL + `/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'username': username,
        'password': password,
      })
    })
        .then(result => {
            let json = result.json() // There's always a response body
            if (result.status >= 200 && result.status < 300) { return json }
            return json.then(Promise.reject.bind(Promise))

        })
        .then(result =>  result.json())
        .catch(error => {
          this.setState({error});
        });
  };

    handlePostAuthenticate = ({ username, password }) => {
        console.log('for login');
        fetch(process.env.REACT_APP_SERVER_URL + `/authenticate`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': username,
                'password': password,
            })
        })
            .then(result => {
                let json = result.json() // There's always a response body
                if (!(result.status >= 200 && result.status < 300)) {
                    return json.then(Promise.reject.bind(Promise))
                }
                return json;
            })
            .then(resJson => {
                if (!!resJson.token) {
                    this.setState({ authToken: resJson.token, username })
                    sessionStorage.setItem('access-token', this.state.authToken);
                    sessionStorage.setItem('username', username);
                    this.handleGetSessions();
                    this.handleGetNotes();
                }
                else {
                    throw new Error(' error in authenticating. check username and password. ');
                }
            })
            .catch(error => {
                console.error(error);
                this.setState({error});
            });
    };

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