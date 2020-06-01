import React, { Component } from "react";
import PomodoroContext from "../../PomodoroContext";
import "./Sessions.css";
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";

class Sessions extends Component {
  static contextType = PomodoroContext;

  handleDelete = (id) => {
    this.context.handleDeleteSession(id);
  };

  componentDidMount() {
    this.context.handleGetSessions();
  }

  render() {
    return (
      <>
        {!!this.context.error ? <ErrorDisplay /> : ""}
        <section>
          <header>My Saved Sessions</header>
          <h3>review past work sessions</h3>
        </section>
        <section className="sessions-display">
          <PomodoroContext.Consumer>
            {({ sessions }) => {
              if (sessions.length !== 0 && sessions.success !== false) {
                return sessions
                  .map((session, index) => {
                    return (
                      <div
                        className="sessions-display"
                        key={index}
                        id={session.id}
                      >
                        <h3>{session.session_name}</h3>
                        <h4>↳ {session.session_description}</h4>
                        <p>session completed: {session.session_end}</p>
                        <button onClick={() => this.handleDelete(session.id)}>
                          Delete
                        </button>
                      </div>
                    );
                  })
                  .reverse();
              }
            }}
          </PomodoroContext.Consumer>
        </section>
      </>
    );
  }
}

export default Sessions;
