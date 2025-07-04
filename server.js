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
    const { command, logo } = req.body;
    const logo = "true";
    lastCommand = command;
    res.json({ status: 'success', received: command, logo: logo });
});

app.listen(PORT, () => {
    console.log(`🟢 External SS Executor backend rodando na porta ${PORT}`);
});
