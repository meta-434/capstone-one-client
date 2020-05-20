import React, { Component } from 'react';
import './Main.css';
import timer from '../images/timer.png';
import sessions from '../images/sessions.png'
import notes from '../images/notes.png';
import PomodoroContext from "../PomodoroContext";

class Main extends Component {

    static contextType = PomodoroContext;

    render() {
        return(
            <>
                <section>
                    <p>{(this.context.error ? this.context.error.error : '')}</p>
                    <header>
                        <h3>What is the Pomodoro Technique ?</h3>
                    </header>
                    <p>The Pomodoro Technique is a time-management technique that encourages productivity and focus</p>
                    <br />
                    <img src={timer} alt={'image of timer'} />
                    <p className='caption'>Timer Page</p>
                    <p>By working on a specific task in 25 minute increments, with 5 minute breaks, your work sessions never lack in direction. Every 4 work sessions, take a longer break. 20 minutes, maybe 30. This time will help you rest before you next round. </p>
                </section>
                <section>
                    <header>
                        <h3>Track your Pomodoro sessions</h3>
                    </header>
                    <img src={sessions} alt={'image of sessions page'} />
                    <p className='caption'>Session Page</p>
                    <p>By reviewing tracking your Pomodoro sessions, you increase your accountability - you want to be able to put something down as completed. By referring to your past Pomodoro sessions, you can see your progress as you work through your sessions. </p>
                </section>
                <section>
                    <header>
                        <h3>Keep Useful Notes</h3>
                    </header>
                    <img src={notes} alt={'image of notes page'} />
                    <p className='caption'>Note Page</p>
                    <p>Keep formulae, phone numbers, or just encouraging thoughts - your most recent note will be displayed on the timer page for reference during work sessions.</p>
                </section>
            </>
        );
    }
}

export default Main;