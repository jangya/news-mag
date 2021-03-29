const { cfg, log, app } = require('./server');

app.listen(cfg.port);
log.info('app listening on port', cfg.port);
