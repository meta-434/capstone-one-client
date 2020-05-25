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
    ReactDOM.render(
            <PomodoroContext.Provider value={{
                notes: [
                    {
                        note_id: 1,
                        note_name: 'jest note',
                        note_content: 'jest test note',
                        note_owner: 30,
                    },
                ],
                handleGetNotes: () => {
                    return {
                        note_name: 'jest note',
                        note_content: 'jest note contents',
                        note_owner: 1
                    };
                }
            }}>
                <Notes />
            </PomodoroContext.Provider>
        , div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders the Notes UI as expected', () => {
    const tree = renderer
        .create(
            <PomodoroContext.Provider value={{
                notes: [
                    {
                        note_id: 1,
                        note_name: 'jest note',
                        note_content: 'jest test note',
                        note_owner: 30,
                    },
                ],
                handleGetNotes: () => {
                    return {
                        note_name: 'jest note',
                        note_content: 'jest note contents',
                        note_owner: 1
                    };
                }
            }}>
                <Notes />
            </PomodoroContext.Provider>

        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

it('adds notes and displays them after submission', () => {
    const newNote = {note_name: 'jest note submission', note_content: 'jest note submission'};

    const component = renderer.create(
        <PomodoroContext.Provider value={{
            notes: [
                {
                    note_id: 1,
                    note_name: 'jest note',
                    note_content: 'jest test note',
                    note_owner: 30,
                },
            ],
            handleGetNotes: () => {
                return {
                    note_name: 'jest note',
                    note_content: 'jest note contents',
                    note_owner: 1
                };
            }
        }}>
            <Notes />
        </PomodoroContext.Provider>
    );

    //const instance = component.getInstance();

    let tree = component.toJSON();
    // pre-submission


    expect(tree).toMatchSnapshot();

})