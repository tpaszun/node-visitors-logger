exports = module.exports;

exports = function visitorsLogger(options) {

  return function visitorsLoggerMiddleware(req, res, next) {
    console.log(req);

    return next();
  };
};

