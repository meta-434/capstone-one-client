import React, { Component } from 'react';
import Timer from 'react-compound-timer';
import './TimerComponent.css'
import PomodoroContext from "../PomodoroContext";

const withTimer = timerProps => WrappedComponent => wrappedComponentProps => (
    <Timer {...timerProps}>
        {timerRenderProps =>
            <WrappedComponent {...wrappedComponentProps} timer={timerRenderProps} />}
    </Timer>
);

class TimerComponent extends Component {
    static contextType = PomodoroContext;

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
    }

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
        return (
            <>
                <header>
                    Pomodoro Timer
                </header>
                <section id="timer-component">
                    <Timer.Minutes formatValue={value => `${(value < 10 ? `0${value}` : value)}`}/>
                    :
                    <Timer.Seconds formatValue={value => `${(value < 10 ? `0${value}` : value)}`}/>
                    <br />
                    <button onClick={start25}>Start25</button>
                    <button onClick={start5}>Start5</button>
                    <button onClick={reset}>Reset</button>
                </section>
                {(!!this.context.authToken || sessionStorage[`access-token`])
                    ? ''
                    : <><p>You are not logged in</p></>
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