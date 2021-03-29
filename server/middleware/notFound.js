const log = require('../log');

module.exports = function (req, res) {
  log.notice('page not found', req.url);
  res.status(404).send('404 Not Found');
};
