/**
 * Author: Tymoteusz Paszun
 * Date: 17.06.2013
 * Time: 00:04
 */

var childProcess = require('child_process')
  , path = require('path')
  , request = require('request')
  , redis = require('redis')
  , expect = require('chai').expect
  , config = require('../examples/config')
  , expressApp = require('../examples/index'); // run example server, ToDo: run `done()` async

var redisClient = new redis.createClient(config.redis.port, config.redis.host);
if (config.redis.pass) {
  redisClient.auth(config.redis.pass, function(err) {
    if (err) throw err;
  });
}

describe('visitors-logger', function() {
  before(function(done) {
    redisClient.flushdb(function(err) { // clear redis db
      if (err) throw err;
      done();
    });
  });

  it('When sending request to server it should log request in redis', function(done) {
    request.get('http://localhost:6000/some/test/path', function(err, res) {
      if (err) throw err;
      expect(res.statusCode).to.equal(200);
      redisClient.llen('visitors-log', function(err, len) {
        if (err) throw err;
        expect(len).to.equal(1);
        redisClient.lpop('visitors-log', function(err, log) {
          if (err) throw err;
          log = JSON.parse(log);
          expect(log.url).to.equal('/some/test/path');
          expect(log.method).to.equal('GET');
          done();
        });
      });
    });
  });

  after(function(done) {
    expressApp.close(function() {
      done();
    });
  });
});
