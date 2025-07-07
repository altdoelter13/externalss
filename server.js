const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let lastCommand = "";
let isChecked = false; // Estado do checkbox

app.get('/', (req, res) => {
    res.json({ lastCommand, isChecked });
});

app.post('/send', (req, res) => {
    const { command, checkbox } = req.body;

    lastCommand = command;
    isChecked = "false"; // caso o checkbox não esteja presente

    res.json({
        status: 'recebido',
        command: lastCommand,
        isChecked
    });
});

app.listen(PORT, () => {
    console.log(`Rodando na porta: ${PORT}`);
});
