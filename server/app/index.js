const express = require('express');
const bodyParser = require('body-parser');
const cfg = require('../config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.locals.cfg = cfg;

// middleware
app.use(express.static(cfg.clientDir));
app.use(require('./routes.js'));

// custom error middleware
app.use(require('../middleware/notFound'));
app.use(require('../middleware/handleError'));

module.exports = app;
