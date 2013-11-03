/**
 * Author: Tymoteusz Paszun
 * Date: 20.06.2013
 * Time: 00:39
 */

var http = require('http')
  , express = require('express')
  , app = express()
  , visitorsLogger = require('../lib/visitorsLogger')
  , config = require('./config');

app.set('port', process.env.PORT || 6000);
app.use(visitorsLogger(config.redis));
app.use(function(req, res) {
  res.send('OK');
});

exports = module.exports = http.createServer(app).listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});
