const log = require('../log');

module.exports = function (er, req, res) {
  log.error(er);
  res.locals.error = er;
  res.status(500).send('500 Server error');
};
