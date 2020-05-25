import React from 'react';
import { render } from '@testing-library/react';
import TimerComponent from './TimerComponent';
import App from '../../App';
import {BrowserRouter} from "react-router-dom";
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import PomodoroContext from "../../PomodoroContext";

test('renders TimerComponent component without crashing', () => {

    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><App><TimerComponent /></App></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders the TimerComponent UI as expected', () => {
    const tree = renderer
        .create(
            <BrowserRouter>
                <App>
                    <PomodoroContext>
                        <TimerComponent />
                    </PomodoroContext>
                </App>
            </BrowserRouter>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
})