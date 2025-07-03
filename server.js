const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let lastCommand = "NONE";

app.get("/", (req, res) => {
  res.json({ command: lastCommand });
});

app.post("/clear", (req, res) => {
  lastCommand = "NONE";
  res.send("Comando limpo");
});

app.post("/send", (req, res) => {
  const { command } = req.body;
  if (typeof command === "string") {
    lastCommand = command;
    console.log("Comando recebido:", command);
    res.send("OK");
  } else {
    res.status(400).send("Comando inválido");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
