import React from 'react';
import { render } from '@testing-library/react';
import Nav from './Nav';
import App from '../../App';
import {BrowserRouter} from "react-router-dom";
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import PomodoroContext from "../../PomodoroContext";

test('renders Nav component without crashing', () => {

    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><App><Nav /></App></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders the Nav UI as expected', () => {
    const tree = renderer
        .create(
            <BrowserRouter>
                <App>
                    <PomodoroContext>
                        <Nav />
                    </PomodoroContext>
                </App>
            </BrowserRouter>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
})