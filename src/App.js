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
    notes: [],
    authToken: undefined,
  }

  logOut = () => {
    this.setState({authToken: undefined});
  }

  handlePostAuthenticate = ({ username, password }) => {
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
        .then(result =>  result.json())
        .then(resJson => {
          if (!!resJson.token) {
            this.setState({ authToken: resJson.token })
          }
          else {
           throw new Error(' error in authenticating. check username and password. ');
          }
        })
        .catch(error => console.error(error));
  };

  handlePostSession = ({}) => {

  }

  handleGetSessions = ({}) => {

  }

  handleDeleteSession = () => {

  }

  handlePostNote = ({note_name, note_content, ownerId}) => {
    fetch(process.env.REACT_APP_SERVER_URL + `/api/notes`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'access-token': `${this.state.authToken}`
      },
      body: JSON.stringify({
        note_name,
        note_content,
        note_owner: ownerId
      })
    })
        .then(res => this.handleGetNotes())
        .catch(error => console.error(error));
  }

  handleGetNotes = () => {
    fetch(process.env.REACT_APP_SERVER_URL+ `/api/notes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'access-token': `${this.state.authToken}`
      }
    })
        .then(response => response.json())
        .then(responseJson => {
          console.log('responseJson', responseJson);
              if (responseJson.success && responseJson.success === false) {
                throw new Error('error in getting notes')
              } else {
                this.setState({
                  notes: responseJson
                })
              }
            }
        )
        .catch(error => console.error(error));
  }

  handleDeleteNote = (id) => {
    fetch(process.env.REACT_APP_SERVER_URL + `/api/notes/${id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'access-token': `${this.state.authToken}`
      }
    })
        .then(res => this.handleGetNotes())
        .catch(error => console.error(error));
  }

  render () {
    const { sessions, notes, authToken } = this.state;
    const context = {
      sessions,
      notes,
      authToken,
      handlePostAuthenticate: this.handlePostAuthenticate,
      logOut: this.logOut,
      handleGetNotes: this.handleGetNotes,
      handlePostNote: this.handlePostNote,
      handleDeleteNote: this.handleDeleteNote,
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