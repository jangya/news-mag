const express = require('express');
const bodyParser = require('body-parser');
const cfg = require('../config');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.locals.cfg = cfg;

app.use(require('./routes.js'));

// Mount client
app.use(express.static(cfg.clientDir));
// Handle React routing, return all requests to React app
// This must be after other routes
app.get('*', function(req, res) {
  res.sendFile(path.resolve(cfg.clientDir, 'index.html'));
});

// custom error middleware
app.use(require('../middleware/notFound'));
app.use(require('../middleware/handleError'));

module.exports = app;
