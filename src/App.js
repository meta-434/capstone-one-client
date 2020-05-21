import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Nav from './Components/Nav/Nav.js';
import Login from './Components/Login/Login.js';
import Signup from './Components/Signup/Signup.js';
import Main from './Components/Main/Main.js';
import Notes from './Components/Notes/Notes.js';
import Sessions from './Components/Sessions/Sessions.js';
import TimerComponent from './Components/TimerComponent/TimerComponent.js';
import PomodoroContext from './PomodoroContext';
import './App.css'

class App extends Component {
  state = {
    sessions: [],
    notes: [],
    authToken: undefined,
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
    fetch(process.env.REACT_APP_SERVER_URL + `/api/sessions`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'access-token': `${this.state.authToken || sessionStorage[`access-token`]}`
      },
      body: JSON.stringify({
        session_name,
        session_description,
        session_owner: ownerId
      })
    })
        .then(res => this.handleGetSessions())
        .catch(error => {
          console.error(error);
          this.setState({error});
        });
  }

  handleGetSessions = () => {
    fetch(process.env.REACT_APP_SERVER_URL+ `/api/sessions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'access-token': `${this.state.authToken || sessionStorage[`access-token`]}`
      }
    })
        .then(response => response.json())
        .then(responseJson => {
              if (responseJson.success && responseJson.success === false) {
                throw new Error('error in getting sessions')
              } else {
                this.setState({
                  sessions: responseJson
                })
              }
            }
        )
        .catch(error => {
          console.error(error);
          this.setState({error});
        });
  }

  handleDeleteSession = (id) => {
    fetch(process.env.REACT_APP_SERVER_URL + `/api/sessions/${id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'access-token': `${this.state.authToken || sessionStorage[`access-token`]}`
      }
    })
        .then(res => this.handleGetSessions())
        .catch(error => {
          console.error(error);
          this.setState({error});
        });
  }

  handlePostNote = ({note_name, note_content, ownerId}) => {
    fetch(process.env.REACT_APP_SERVER_URL + `/api/notes`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'access-token': `${this.state.authToken || sessionStorage[`access-token`]}`
      },
      body: JSON.stringify({
        note_name,
        note_content,
        note_owner: ownerId
      })
    })
        .then(res => this.handleGetNotes())
        .catch(error => {
          console.error(error);
          this.setState({error});
        });
  }

  handleGetNotes = () => {
    fetch(process.env.REACT_APP_SERVER_URL+ `/api/notes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'access-token': `${this.state.authToken || sessionStorage[`access-token`]}`
      }
    })
        .then(response => response.json())
        .then(responseJson => {
              if (responseJson.success && responseJson.success === false) {
                throw new Error('error in getting notes')
              } else {
                this.setState({
                  notes: responseJson
                })
              }
            }
        )
        .catch(error => {
          console.error(error);
          this.setState({error});
        });
  }

  handleDeleteNote = (id) => {
    fetch(process.env.REACT_APP_SERVER_URL + `/api/notes/${id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'access-token': `${this.state.authToken || sessionStorage[`access-token`]}`
      }
    })
        .then(res => this.handleGetNotes())
        .catch(error => {
          console.error(error);
          this.setState({error});
        });
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