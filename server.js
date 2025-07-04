const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let lastCommand = "";

app.get('/', (req, res) => {
    res.json({ command: lastCommand });
});

app.post('/send', (req, res) => {
    const { command } = req.body;

    lastCommand = command;
    console.log("Novo comando recebido:", command);
    res.json({ status: 'success', received: command });
});

app.listen(PORT, () => {
    console.log(`🟢 External SS Executor backend rodando na porta ${PORT}`);
});
