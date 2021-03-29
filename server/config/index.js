require('dotenv').config();
const env = process.env.NODE_ENV || 'staging';
const port = process.env.PORT || 5000;
const resolve = require('path').resolve;

// env specific config
const cfg = require('./env/' + env);
cfg.env = env;
cfg.port = port;

cfg.clientDir = resolve(__dirname, '../../client/build');

module.exports = cfg;
