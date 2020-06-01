import React from "react";
import { render } from "@testing-library/react";
import Signup from "./Signup";
import App from "../../App";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import PomodoroContext from "../../PomodoroContext";

test("renders Signup component without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <App>
        <Signup />
      </App>
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("renders the Signup UI as expected", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <App>
          <PomodoroContext>
            <Signup />
          </PomodoroContext>
        </App>
      </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
