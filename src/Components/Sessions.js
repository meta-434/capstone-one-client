import React, { Component } from 'react';
import PomodoroContext from "../PomodoroContext";

class Sessions extends Component {

    static contextType = PomodoroContext;

    constructor() {
        super();

        this.state = {
            name: undefined,
            description: undefined,
            nameValid: false,
            descriptionValid: false,
        }
    }

    componentDidMount() {
        this.context.handleGetSessions();
        this.validateName(this.state.name);
        this.validateContent(this.state.description);
    }

    handleDelete = (id) => {
        this.context.handleDeleteSession(id);
    }

    handlePostSubmit = (e) => {
        e.preventDefault();
        const {name, description} = this.state;
        this.context.handlePostSession({session_name: name, session_description: description});
        // this.context.handleGetSessions();
    }

    handleSessionName = (e) => {
        let nameInput = e.target.value;
        this.setState({ name: nameInput }, () => this.validateName(nameInput));
    }

    handleSessionContent = (e) => {
        let descriptionInput = e.target.value;
        this.setState({ description: descriptionInput }, () => this.validateContent(descriptionInput))
    };

    validateName(name) {
        let validationMessages;
        let hasError = false;

        if (!name) {
            hasError = true;
            validationMessages = ' name cannot be blank. '
        }
        else {
            validationMessages = '';
        }

        this.setState({
            nameValid: !hasError,
            nameValidation: validationMessages,
        }, () =>this.nameValid(name));
    };

    validateContent(description) {
        let validationMessages;
        let hasError = false;

        if (!description) {
            hasError = true;
            validationMessages = ' description shouldn\'t be blank... how can you remember what you did? '
        }

        else {
            validationMessages = '';
        }

        this.setState({
            descriptionValid: !hasError,
            descriptionValidation: validationMessages,
        }, () => this.descriptionValid(description));
    };

    nameValid(name) {
        if (this.state.name) {
            this.setState({name: name})
        }
    };

    descriptionValid(description) {
        if (this.state.description) {
            this.setState({description})
        }
    };

    render() {
        return(
            <>
                <section>
                    <header>My Saved Sessions</header>
                    <h3>review past work sessions</h3>
                </section>
                <section>
                    <form
                        className="react-form"
                        onSubmit={this.handlePostSubmit}>
                        <input
                            type="text"
                            id="session-name"
                            name="session-name"
                            className="session-name"
                            onChange={this.handleSessionName}
                            defaultValue={'enter session name'}
                            aria-label="session name"
                            aria-required="true"
                            aria-describedby="error-box"
                        />
                        <label htmlFor="session-description">session description: </label>
                        <textarea
                            id="session-description"
                            name="session-description"
                            className="session-description"
                            onChange={this.handleSessionContent}
                            defaultValue={'enter session description'}
                            aria-label="session description"
                            aria-required="true"
                            aria-describedby="error-box"
                        />
                        <button
                            className="submit-button"
                            type="submit"
                            disabled={!this.state.nameValid || !this.state.descriptionValid}>
                            Submit
                        </button>
                    </form>
                    <section className="error-box" id="error-box" aria-live="assertive">
                        {this.state.nameValidation}
                        <br />
                        {this.state.descriptionValidation}
                    </section>
                </section>
                <section>
                    <PomodoroContext.Consumer>
                        {({sessions}) => {
                            if (sessions.length !== 0) {
                                return sessions.map((session, index) => {
                                    return (
                                        <section className="sessions-display" key={index} id={session.id}>
                                            <h3>{session.session_name}</h3>
                                            <h4>↳ {session.session_description}</h4>
                                            <p>session completed: {session.session_end}</p>
                                            <button onClick={() => this.handleDelete(session.id)}>Delete</button>
                                        </section>
                                    );
                                }).reverse();
                            }
                        }}
                    </PomodoroContext.Consumer>
                </section>
            </>
        );
    }
}

export default Sessions;