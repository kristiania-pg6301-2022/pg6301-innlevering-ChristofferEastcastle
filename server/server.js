import express from "express";
import axios from "axios";
import dotenv from "dotenv";


dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});


app.get("/api/question", async (req, res) => {
  async function fetchQuestion() {

    return (
      await axios.get(
        `https://quizapi.io/api/v1/questions?apiKey=${process.env.API_KEY}&topic=Programming&limit=1`
      )
    ).data[0];
  }

  res.send(await fetchQuestion()).json;
})

let port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
})