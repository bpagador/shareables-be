const express = require('express');
const app = express();
const Shareable = require('./models/Shareable');

app.use(require('cors')());
app.use(express.json());

app.post('/shareables', (req, res) => {
    Shareable
        .create(req.body)
        .then(shareable => res.send(shareable));
});

module.exports = app;
