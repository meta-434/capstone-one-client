import React from 'react';
import { render } from '@testing-library/react';
import Login from '../Login/Login';
import App from '../../App';
import {BrowserRouter} from "react-router-dom";
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import PomodoroContext from "../../PomodoroContext";
import ErrorDisplay from "./ErrorDisplay";

let tree;

beforeEach(() => {
    tree = renderer
        .create(
            <PomodoroContext.Consumer error={{error: 'user already exists'}}>
                <ErrorDisplay />
            </PomodoroContext.Consumer>
        )
        .toJSON();

})

test('renders ErrorDisplay component without crashing', () => {

    const div = document.createElement('div');
    ReactDOM.render(<PomodoroContext.Consumer error={{error: 'user already exists'}}><ErrorDisplay /></PomodoroContext.Consumer>, div);
    ReactDOM.unmountComponentAtNode(div);
});

test('renders the ErrorDisplay UI as expected', () => {

    expect(tree).toMatchSnapshot();
})

test('renders an empty p element when no error is present', () => {
    expect(tree).toContain('p');
})