import React, { Component } from 'react';
import './Main.css';

class Main extends Component {
    render() {
        return(
            <>
                <section>
                    <header>
                        What is the Pomodoro Technique ?
                    </header>
                    <p>The Pomodoro Technique is a time-management technique that encourages productivity and focus</p>
                    <p>[<em>placeholder for screenshot of pomodoro timer</em>]</p>
                    <p>By working on a specific task in 25 minute increments, with 5 minute breaks, your work sessions never lack in direction. Every 4 work sessions, take a longer break. 20 minutes, maybe 30. This time will help you rest before you next round. </p>
                </section>
                <section>
                    <header>
                        <h3>Track your Pomodoro sessions</h3>
                    </header>
                    <p>[<em>placeholder for screenshot of session tracking page</em>]</p>
                    <p>By reviewing tracking your Pomodoro sessions, you increase your accountability - you want to be able to put something down as completed. By referring to your past Pomodoro sessions, you can see your progress as you work through your sessions. </p>
                </section>
                <section>
                    <header>
                        <h3>Keep track of your progress</h3>
                    </header>
                    <p>[<em>placeholder for screenshot of dream stats UI</em>]</p>
                    <p>Interactive charts and personalized statistics help you on stay on track with your goals.</p>
                </section>
            </>
        );
    }
}

export default Main;