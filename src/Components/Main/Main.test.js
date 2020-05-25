import React from 'react';
import { render } from '@testing-library/react';
import Main from './Main';
import App from '../../App';
import {BrowserRouter} from "react-router-dom";
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import PomodoroContext from "../../PomodoroContext";

test('renders Main component without crashing', () => {

    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><App><Main /></App></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders the Main UI as expected', () => {
    const tree = renderer
        .create(
            <BrowserRouter>
                <App>
                    <PomodoroContext>
                        <Main />
                    </PomodoroContext>
                </App>
            </BrowserRouter>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
})