import React from 'react';
import { render } from '@testing-library/react';
import Login from './Login';
import App from '../../App';
import {BrowserRouter} from "react-router-dom";
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import PomodoroContext from "../../PomodoroContext";

test('renders Login component without crashing', () => {

    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><App><Login /></App></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders the Login UI as expected', () => {
    const tree = renderer
        .create(
            <BrowserRouter>
                <App>
                    <PomodoroContext>
                        <Login />
                    </PomodoroContext>
                </App>
            </BrowserRouter>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
})