
const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api');
const cookieParser = require('cookie-parser');
const path = require('path')
const app = express();


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ // Middleware
    extended: true
  }));

app.use(express.json());

app.use('/api', apiRouter);

app.use('/static', express.static(path.resolve(__dirname, 'public')))

app.use(cookieParser());

module.exports = app;
