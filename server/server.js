import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import path from "path";
import { isCorrectAnswer, randomQuestion } from "./questions.js";

process.once("SIGUSR2", function () {
  process.kill(process.pid, "SIGUSR2");
});

process.on("SIGINT", function () {
  // this is only called on ctrl+c, not restart
  process.kill(process.pid, "SIGINT");
});

dotenv.config();
const app = express();
app.use(express.json());

app.get("/api/question", async (req, res) => {
  async function fetchQuestionFromApi() {
    return (
      await axios.get(
        `https://quizapi.io/api/v1/questions?apiKey=${process.env.API_KEY}&topic=Programming&limit=1`
      )
    ).data[0];
  }

  const text = randomQuestion();

  const question = {
    id: text.id,
    question: text.question,
    answers: text.answers,
  };

  res.header("Access-Control-Allow-Origin", "*").json(question);
});

app.post("/api/question", (req, res) => {
  const { id, answer } = req.body;
  if (id && answer) {
    res.send(isCorrectAnswer(id, answer));
  } else {
    res.sendStatus(400);
  }
});

app.use(express.static("../client/dist/"));

app.use((req, res) => {
  res.sendFile(path.resolve("../client/dist/index.html"));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
