import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import * as React from "react";
import axios from "axios";

function FrontPage({ answered, correctAnswers }) {
  return (
    <div>
      <h1>QuizApplication</h1>
      <h3>Correct answers: {correctAnswers}</h3>
      <h3>Total answered: {answered}</h3>
      <ul>
        <li>
          <Link to="/question">Answer question</Link>
        </li>
      </ul>
    </div>
  );
}

function QuestionPage({ answered, correctAnswers }) {
  return (
    <div>
      <h1>Question</h1>
      <p>/*Click on the one you think is right*/</p>
      <Question answered={answered} correctAnswer={correctAnswers} />
    </div>
  );
}

function Question({ correctAnswer, answered }) {
  const [question, setQuestion] = useState();

  useEffect(async () => {
    const text = await fetchQuestion();
    setQuestion(text.data);
  }, []);

  async function fetchQuestion() {
    return axios.get("http://localhost:3000/api/question");
  }

  const navigate = useNavigate();

  async function handleAnswer(answer) {
    answered((a) => a + 1);
    navigate("/answer/correct");

    const correct = await axios.post("http://localhost:3000/api/question", {
      id: question.id,
      answer: answer,
    });

    if (correct.data === true) {
      correctAnswer((c) => c + 1);
      navigate("/answer/correct");
    } else {
      navigate("/answer/wrong");
    }
  }

  if (question) {
    return (
      <div>
        <h4>{question.question}</h4>
        {Object.keys(question.answers).map((k) => (
          <p onClick={() => handleAnswer(k)} key={k}>
            {question.answers[k]}
          </p>
        ))}
      </div>
    );
  }
  return <h4>Loading...</h4>;
}

export function QuizApplication() {
  const [answered, setAnswered] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage answered={answered} correctAnswers={correctAnswers} />} />
        <Route
          path="/question"
          element={
            <QuestionPage
              answered={setAnswered}
              correctAnswers={setCorrectAnswers}
            />
          }
        />
        <Route
          path="/answer/correct"
          element={
            <div>
              <h1>Correct!</h1>
              <GoHomeOrNew />
            </div>
          }
        />
        } />
        <Route
          path="/answer/wrong"
          element={
            <div>
              <h1>Wrong answer...</h1>
              <GoHomeOrNew />
            </div>
          }
        />
        } />
      </Routes>
    </BrowserRouter>
  );
}

function GoHomeOrNew() {
  return (
    <div>
      <ul>
        <li>
          <Link to={"/question"}>New Question</Link>
        </li>

        <li>
          <Link to={"/"}>Go home</Link>
        </li>
      </ul>
    </div>
  );
}
