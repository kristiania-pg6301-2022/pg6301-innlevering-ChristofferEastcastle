import express from "express";
import dotenv from "dotenv";
import path from "path";
import { isCorrectAnswer, randomQuestion } from "./questions.js";
import { isAuthorized, tryAuthorize } from "./db.js";
import cookieParser from "cookie-parser";
import https from "https";
import fs from "fs";
import http from "http";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  if (!req.secure) {
    const hostWithoutPort = req.headers.host.split(":")[0];
    res.redirect("https://" + hostWithoutPort + ":4443" + req.originalUrl)
  } else {
    next()
  }
})

app.post("/login", async (req, res) => {
  const authorized = await tryAuthorize(req.body);
  if (authorized != null) {
    console.log("Setting cookie")
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
  if (authorize) next();
  else res.redirect("/login");
});

app.get("/api/question", async (req, res) => {
  const text = randomQuestion();

  const question = {
    id: text.id,
    question: text.question,
    answers: text.answers
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
  passphrase: fs.readFileSync("../certs/pswd", "utf-8"),
};

const http_server = http.createServer(app);
const https_server = https.createServer(options, app);
http_server.listen(3000);
https_server.listen(process.env.PORT || 4443);
