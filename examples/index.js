/**
 * Author: Tymoteusz Paszun
 * Date: 20.06.2013
 * Time: 00:39
 */

var express = require('express')
  , app = express()
  , visitorsLogger = require('../lib/visitors-logger')
  , config = require('./config');

app.set('port', process.env.PORT || 5000);
app.use(visitorsLogger(config.redis));
app.use(function(req, res) {
  res.send(200);
});

app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});
