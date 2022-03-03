import * as React from "react";
import ReactDOM from "react-dom";

import {QuizApplication} from "../quiz.jsx";


describe("quiz application", () => {


  it("shows front page", () => {
    const element = document.createElement("div");
    ReactDOM.render(<QuizApplication/>, element)

    expect(element.querySelector("h1").innerHTML)
      .toEqual("QuizApplication")
    expect(element.innerHTML).toMatchSnapshot()
  })
})