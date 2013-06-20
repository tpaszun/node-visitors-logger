var RedisStore = require('./redisStore');

exports = module.exports = function visitorsLogger(options) {
  var self = this;

  this.store = new RedisStore(options);

  return function visitorsLoggerMiddleware(req, res, next) {
    var logEntry = {
      timestamp: new Date().toISOString(),
      'remote-addr': req.connection.remoteAddress,
      host: req.host,
      method: req.method,
      url: req.originalUrl || req.url,
      status: res.statusCode,
      referrer: req.headers['referer'] || req.headers['referrer'],
      'user-agent': req.headers['user-agent'],
      sid: req.sessionID
    };

    self.store.log(logEntry);

    return next();
  };
};

