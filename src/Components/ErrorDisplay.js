import React, { Component } from 'react';
import PomodoroContext from "../PomodoroContext";
import './ErrorDisplay.css';

export default class errorDisplay extends Component {
    static contextType = PomodoroContext;

    render() {
        const {error} = this.context;
        return (
          <p className={"error"}>{(error) ? (error.error) : ('')}</p>
        );
    }
}