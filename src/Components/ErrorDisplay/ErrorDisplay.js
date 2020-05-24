import React, { Component } from 'react';
import PomodoroContext from "../../PomodoroContext";
import './ErrorDisplay.css';

export default class errorDisplay extends Component {
    static contextType = PomodoroContext;

    render() {
        const {error} = this.context;
        return (
            (!!error) ? (<p className={"error"}>status: {(error) ? (error.error || error.message) : ('')}</p>) : ('')
        );
    }
}