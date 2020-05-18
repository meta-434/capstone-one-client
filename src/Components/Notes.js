import React, { Component } from 'react';
import PomodoroContext from "../PomodoroContext";

class Notes extends Component {

    static contextType = PomodoroContext;

    componentDidMount() {
        this.context.handleGetNotes();
    }

    render() {
        return(
            <>
                <header>My Notes</header>
                <PomodoroContext.Consumer>
                    {({notes}) => {
                        console.log('notes', notes);

                        return notes.map((note, index) => {
                            return (
                                <section className="notes-display" key={index} id={note.id}>
                                    <h3>{note.note_name}</h3>
                                    <h4>↳ {note.note_content}</h4>
                                </section>
                            );
                        })
                    }}
                </PomodoroContext.Consumer>
            </>
        );
    }
}

export default Notes;