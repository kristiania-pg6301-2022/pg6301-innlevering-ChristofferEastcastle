import * as React from "react";
import ReactDOM from "react-dom";

import { Question, QuizApplication } from "../quiz.jsx";
import { act } from "react-dom/test-utils";

describe("quiz application", () => {


  it("shows front page", () => {
    const element = document.createElement("div");
    ReactDOM.render(<QuizApplication />, element);

    expect(element.querySelector("h1").innerHTML)
      .toEqual("QuizApplication");
    expect(element.innerHTML).toMatchSnapshot();
  });

  const mockQuestion = {
    id: 913,
    question: "Which of the following are core Kubernetes objects?",
    description: null,
    answers: {
      answer_a: "Pods, Services, Volumes",
      answer_b: "Pods, Docker, Volumes",
      answer_c: "Pods, Services, Droplets",
      answer_d: "None of the mentioned",
      answer_e: null,
      answer_f: null
    }
  };


  it("shows mock question", () => {

    const element = document.createElement("div");

    act(() => {
      ReactDOM.render(<Question question={mockQuestion} correctAnswer={0} answered={0} />, element);
    });
    expect(element.querySelector("h4").innerHTML)
      .toEqual(mockQuestion.question);
    expect(element.innerHTML).toMatchSnapshot();
  });
});
