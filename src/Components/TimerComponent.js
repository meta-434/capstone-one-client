import React, { Component } from 'react';
import Timer from 'react-compound-timer';

const withTimer = timerProps => WrappedComponent => wrappedComponentProps => (
    <Timer {...timerProps}>
        {timerRenderProps =>
            <WrappedComponent {...wrappedComponentProps} timer={timerRenderProps} />}
    </Timer>
);

class TimerComponent extends Component {

    componentDidMount() {

        const { setCheckpoints, setTime, start, stop, reset } = this.props.timer;


        setCheckpoints([
            {
                time: 0,
                callback: () => {
                    stop();
                },
            },
            {
                time: 3000,
                callback: () => {},
            }
        ]);
    }

    render() {
        const { start, reset, stop, setTime } = this.props.timer;
        const start25 = () => {
            setTime(25000);
            reset();
            start();
        }

        const start5 = () => {
            setTime(5000);
            reset();
            start();
        }
        return (
            <div>
                <Timer.Seconds />
                <button onClick={start25}>Start25</button>
                <button onClick={start5}>Start5</button>
                <button onClick={reset}>Reset</button>
            </div>


        );
    }
}

const TimerHOC = withTimer({
    direction: 'backward',
    initialTime: 25000,
    startImmediately: false,
})(TimerComponent);

export default TimerHOC;