import React, { Component } from 'react';
import PomodoroContext from "../../PomodoroContext";
import './Notes.css'
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";

class Notes extends Component {

    static contextType = PomodoroContext;

    constructor() {
        super();

        this.state = {
            name: undefined,
            content: undefined,
            nameValid: false,
            contentValid: false,
        }
    }

    componentDidMount() {
        this.context.handleGetNotes();
        this.validateName(this.state.name);
        this.validateContent(this.state.content);
    }

    handleDelete = (id) => {
        this.context.handleDeleteNote(id);
    }

    handlePostSubmit = (e) => {
        e.preventDefault();
        const {name, content} = this.state;
        this.context.handlePostNote({note_name: name, note_content: content});
        // this.context.handleGetNotes();
    }

    handleNoteName = (e) => {
        let nameInput = e.target.value;
        this.setState({ name: nameInput }, () => this.validateName(nameInput));
    }

    handleNoteContent = (e) => {
        let contentInput = e.target.value;
        this.setState({ content: contentInput }, () => this.validateContent(contentInput))
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

    validateContent(content) {
        let validationMessages;
        let hasError = false;

        if (!content) {
            hasError = true;
            validationMessages = ' content cannot be blank. '
        }

        else {
            validationMessages = '';
        }

        this.setState({
            contentValid: !hasError,
            contentValidation: validationMessages,
        }, () => this.contentValid(content));
    };

    nameValid(name) {
        if (this.state.name) {
            this.setState({name: name})
        }
    };

    contentValid(content) {
        if (this.state.content) {
            this.setState({content})
        }
    };

    render() {
        return(
            <>
                {
                    (!!this.context.error)
                        ? <ErrorDisplay />
                        : ''
                }
                <section>
                    <header>My Notes</header>
                </section>
                <section className="react-form-section">
                    <form
                        className="react-form"
                        onSubmit={this.handlePostSubmit}>
                        <label htmlFor="note-name">note name: </label>
                        <input
                            type="text"
                            id="note-name"
                            name="note-name"
                            className="note-name"
                            onChange={this.handleNoteName}
                            defaultValue={'enter note name'}
                            aria-label="note name"
                            aria-required="true"
                            aria-describedby="error-box"
                        />
                        <label htmlFor="note-content">note content: </label>
                        <textarea
                            id="note-content"
                            name="note-content"
                            className="note-content"
                            onChange={this.handleNoteContent}
                            defaultValue={'enter note content'}
                            aria-label="note content"
                            aria-required="true"
                            aria-describedby="error-box"
                        />
                        <button
                            className="submit-button"
                            type="submit"
                            disabled={!this.state.nameValid || !this.state.contentValid}>
                            Submit
                        </button>
                    </form>
                    <section className="error-box" id="error-box" aria-live="assertive">
                        {this.state.nameValidation}
                        <br />
                        {this.state.contentValidation}
                    </section>
                </section>
                <section className="notes-display">
                    <PomodoroContext.Consumer>
                        {({notes}) => {
                            if (notes.length !== 0) {
                                return notes.map((note, index) => {
                                    return (
                                        <div className="notes-display" key={index} id={note.id}>
                                            <h3>{note.note_name}</h3>
                                            <h4>↳ {note.note_content}</h4>
                                            <button onClick={() => this.handleDelete(note.id)}>Delete</button>
                                        </div>
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

export default Notes;