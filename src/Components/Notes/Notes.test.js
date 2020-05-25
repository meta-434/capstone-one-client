import React from 'react';
import { render } from '@testing-library/react';
import Notes from './Notes';
import App from '../../App';
import {BrowserRouter} from "react-router-dom";
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import PomodoroContext from "../../PomodoroContext";

test('renders Notes component without crashing', () => {

    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><App><Notes /></App></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders the Notes UI as expected', () => {
    const tree = renderer
        .create(
            <BrowserRouter>
                <App>
                    <PomodoroContext>
                        <Notes />
                    </PomodoroContext>
                </App>
            </BrowserRouter>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
})