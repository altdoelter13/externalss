const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true })); // Para receber `x-www-form-urlencoded`

let lastCommand = "";

app.get('/', (req, res) => {
    res.json({ lastCommand });
});

app.post('/send', (req, res) => {
    const { command } = req.body;
    lastCommand = command;
});

app.listen(PORT, () => {
    console.log(`rodando na porta: ${PORT}`);
});
