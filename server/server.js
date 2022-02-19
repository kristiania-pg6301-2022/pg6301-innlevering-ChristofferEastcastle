import express from "express";
import dotenv from "dotenv";
import path from "path";
import { isCorrectAnswer, randomQuestion } from "./questions.js";
import { isAuthorized, tryAuthorize } from "./db.js";
import cookieParser from "cookie-parser";
import https from "https";
import fs from "fs";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.post("/login", async (req, res) => {
  const authorized = await tryAuthorize(req.body);
  if (authorized != null) {
    res.cookie("id", authorized._id);
  } else {
    res.status(401);
  }
  res.redirect("/");
});

app.get("/login", (req, res) => {
  res.sendFile(path.resolve("../client/dist/login.html"));
});

app.get("/*", async (req, res, next) => {
  const authorize = await isAuthorized(req.cookies);
  console.log(authorize)
  if (authorize) next();
  else res.redirect("/login");
});

app.get("/api/question", async (req, res) => {
  const text = randomQuestion();

  const question = {
    id: text.id,
    question: text.question,
    answers: text.answers,
  };

  res.json(question);
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

const options = {
  key: fs.readFileSync("../certs/myCA.key", "utf-8"),
  cert: fs.readFileSync("../certs/myCA.pem", "utf-8"),
  passphrase: fs.readFileSync("../certs/pswd", "utf-8")
}
console.log(options)
const server = https.createServer(options, app);
server.listen(process.env.PORT || 4443, "localhost");


/*const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on http://localhost:${server.address().port}`);
});
 */
