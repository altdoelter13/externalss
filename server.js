const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true })); // Para receber `x-www-form-urlencoded`
app.use(express.json()); // Também necessário se quiser aceitar JSON direto

let lastCommand = "";

app.get('/', (req, res) => {
    res.json({ lastCommand }); // Corrigido de req.json para res.json
});

app.post('/send', (req, res) => {
    const { command } = req.body;
    lastCommand = command;
    res.json({ status: 'comando recebido', command });
});

app.listen(PORT, () => {
    console.log(`Rodando na porta: ${PORT}`);
});
