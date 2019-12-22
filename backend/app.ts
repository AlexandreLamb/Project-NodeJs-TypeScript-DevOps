
const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api');
const middlewares = require('./middlewares/middleware');
const cookieParser = require('cookie-parser');
const path = require('path')
const app = express();

app.set('views', __dirname + "/views")
app.set('view engine', 'ejs');
app.use('/static', express.static(path.resolve(__dirname, 'public')))

app.use(cookieParser())
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ // Middleware
    extended: true
  }));

app.use(express.json());

app.use('/api',apiRouter);
app.all('*',middlewares, function(req, res) {
  res.redirect("/api/index/metrics");
});
;

module.exports = app;
