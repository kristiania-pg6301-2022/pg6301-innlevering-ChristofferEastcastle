import express from "express";
import dotenv from "dotenv";
import path from "path";
import { isCorrectAnswer, randomQuestion } from "./questions.js";

dotenv.config();
const app = express();
app.use(express.json());

app.get("/api/question", async (req, res) => {
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

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on http://localhost:${server.address().port}`);
});
