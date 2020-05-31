import React from 'react';
import { render } from '@testing-library/react';
import Sessions from './Sessions';
import App from '../../App';
import {BrowserRouter} from "react-router-dom";
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import PomodoroContext from "../../PomodoroContext";

test('renders Sessions component without crashing', () => {

    const div = document.createElement('div');
    ReactDOM.render(
        <PomodoroContext.Provider value={{
            sessions: [
                {
                    session_id: 1,
                    session_name: 'jest session',
                    session_content: 'jest test session',
                    session_owner: 30,
                },
            ],
            handleGetSessions: () => {
                return {
                    session_name: 'jest session',
                    session_content: 'jest session contents',
                    session_owner: 1
                };
            }
        }}>
            <Sessions />
        </PomodoroContext.Provider>
        , div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders the Sessions UI as expected', () => {
    const tree = renderer
        .create(
            <PomodoroContext.Provider value={{
                sessions: [
                    {
                        session_id: 1,
                        session_name: 'jest session',
                        session_description: 'jest test session',
                        session_end: new Date().getMonth(),
                        session_owner: 30,
                    },
                ],
                handleGetSessions: () => {
                    return {
                        session_name: 'jest session',
                        session_description: 'jest session description',
                        session_end: new Date().getMonth(),
                        session_owner: 1
                    };
                }
            }}>
                <Sessions />
            </PomodoroContext.Provider>

        )
        .toJSON();

    expect(tree).toMatchSnapshot();
})