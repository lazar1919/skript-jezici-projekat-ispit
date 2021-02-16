const express = require('express');
const users = require('./routes/users');
const matches = require('./routes/matches');
const tickets = require('./routes/tickets');
const history = require('connect-history-api-fallback');
const path = require('path');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET", "PUT", "POST", "DELETE", "OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api', users);
app.use('/api', matches);
app.use('/api', tickets);

const staticMiddleware = express.static(path.join(__dirname, 'dist'));

app.use(staticMiddleware);
app.use(history());
app.use(staticMiddleware);

app.listen(8000);