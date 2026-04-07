const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 80;
let storedCode = "";
app.use(bodyParser.text({ type: '*/*' }));
app.all('/', (req, res) => {
    if (req.method === 'POST') {
        storedCode = req.body;
        return res.send("sended!");
    }
    res.send(storedCode);
});

app.listen(port, () => {});
