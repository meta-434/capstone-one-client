import React, { Component } from 'react';
import './Signup.css'
import PomodoroContext from "../../PomodoroContext";
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";

class Signup extends Component {

    static contextType = PomodoroContext;

    constructor() {
        super();
        this.state = {
            username: undefined,
            password: undefined,
            validation: '',
            usernameValid: false,
            passwordValid: false,
            error: undefined,
        }
    }

    componentDidMount() {
        this.validateUsername(this.state.username);
        this.validatePassword(this.state.password);
    }

    handlePatchSubmit = (e) => {
        e.preventDefault();
        this.context.handlePostSignup(this.state);
        const err = this.context.handleGetErrors();
        this.setState({error: err})
        console.log(err);
    }

    handleUsername = (e) => {
        let usernameInput = e.target.value;
        this.setState({ username: usernameInput }, () => this.validateUsername(usernameInput));
    }

    handlePassword = (e) => {
        let passwordInput = e.target.value;
        this.setState({ password: passwordInput }, () => this.validatePassword(passwordInput));
    }

    validateUsername = (username) => {
        let validationMessages;
        let hasError = false;

        if (!username) {
            hasError = true;
            validationMessages = ' username cannot be blank '
        }
        else {
            validationMessages = '';
        }

        this.setState({
            usernameValid: !hasError,
            usernameValidation: validationMessages,
        }, () => this.usernameValid(username))
    }

    validatePassword = (password) => {
        let validationMessages;
        let hasError = false;

        if (!password) {
            hasError = true;
            validationMessages = ' password cannot be blank '
        }
        else {
            validationMessages = '';
        }

        this.setState({
            passwordValid: !hasError,
            passwordValidation: validationMessages,
        }, () => this.passwordValid(password))
    }

    usernameValid = (username) => {
        if (this.state.username) {
            this.setState({username});
        }
    }

    passwordValid = (password) => {
        if (this.state.password) {
            this.setState({password})
        }
    }

    render() {
        return(
            <>
                {
                (!!this.context.error)
                    ? <ErrorDisplay />
                    : ''
                }
                <main className="signup-form">
                    <section>
                        <header>
                            signup to save your sessions and notes!
                        </header>
                    </section>
                    <section>
                        <form
                            className='react-form'
                            onSubmit={this.handlePatchSubmit}>
                            <label htmlFor='signup-username'>username: </label>
                            <input
                                type="text"
                                id="signup-username"
                                name="signup-username"
                                className="signup-username"
                                onChange={this.handleUsername}
                                placeholder={'enter username'}
                                aria-label="username"
                                aria-required="true"
                                aria-describedby="error-box"
                            />
                            <label htmlFor='signup-password'>password: </label>
                            <input
                                type="text"
                                id="signup-password"
                                name="signup-password"
                                className="signup-password"
                                onChange={this.handlePassword}
                                placeholder={'enter password'}
                                aria-label="password"
                                aria-required="true"
                                aria-describedby="error-box"
                            />
                            <button
                                className="submit-button"
                                type="submit"
                                disabled={!this.state.usernameValid || !this.state.passwordValid }>
                                Submit
                            </button>
                            <section className="error-box" id="error-box" aria-live="assertive">
                                {this.state.usernameValidation}
                                <br />
                                {this.state.passwordValidation}
                            </section>
                        </form>
                    </section>
                </main>
            </>
        );
    }
}

export default Signup;