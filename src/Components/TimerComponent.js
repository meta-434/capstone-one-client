import React, { Component } from 'react';
import Timer from 'react-compound-timer';
import './TimerComponent.css'
import PomodoroContext from "../PomodoroContext";
import ErrorDisplay from "./ErrorDisplay";

const withTimer = timerProps => WrappedComponent => wrappedComponentProps => (
    <Timer {...timerProps}>
        {timerRenderProps =>
            <WrappedComponent {...wrappedComponentProps} timer={timerRenderProps} />}
    </Timer>
);

class TimerComponent extends Component {
    static contextType = PomodoroContext;

    constructor(props) {
        super(props);

        this.state = {
            name: undefined,
            description: undefined,
            nameValid: false,
            descriptionValid: false,
        }
    }

    componentDidMount() {
        const { setCheckpoints, stop } = this.props.timer;

        setCheckpoints([
            {
                time: 0,
                callback: () => {
                    stop();
                },
            },
            {
                time: 25000,
                callback: () => {},
            }
        ]);

        this.context.handleGetSessions();
        this.context.handleGetNotes();
        this.validateName(this.state.name);
        this.validateContent(this.state.description);
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
        const { start, reset, setTime } = this.props.timer;
        const start25 = () => {
            setTime(1500000);
            reset();
            start();
        }

        const start5 = () => {
            setTime(300000);
            reset();
            start();
        }
        const {notes} = this.context;
        return (
            <>
                <ErrorDisplay />
                <section>
                    <header>
                        Pomodoro Timer
                    </header>
                </section>
                <section id="timer-component">
                    {(!!this.context.authToken || sessionStorage[`access-token`])
                        ? ''
                        : <><p>You are not logged in</p></>
                    }
                    <Timer.Minutes formatValue={value => `${(value < 10 ? `0${value}` : value)}`}/>
                    :
                    <Timer.Seconds formatValue={value => `${(value < 10 ? `0${value}` : value)}`}/>
                    <br />
                    <button onClick={start25}>Start25</button>
                    <button onClick={start5}>Start5</button>
                    <button onClick={reset}>Reset</button>
                </section>
                <section>
                    {
                        (!!notes && (notes.length > 0))
                            ? <div className='timer-note'>
                                <p>{notes[0].note_name}</p>
                                <p>{notes[0].note_content}</p>
                            </div>
                                : ``
                    }
                </section>
                {(!!this.context.authToken || sessionStorage[`access-token`])
                    ? <>
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
                    </>
                    : ''
                }
            </>
        );
    }
}

const TimerHOC = withTimer({
    direction: 'backward',
    initialTime: 1500000,
    startImmediately: false,
})(TimerComponent);

export default TimerHOC;