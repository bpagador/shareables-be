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

app.get('/shareables', (req, res) => {
    Shareable
        .find()
        .then(shareables => res.send(shareables));
});

module.exports = app;
