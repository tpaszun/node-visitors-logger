/**
 * Author: Tymoteusz Paszun
 * Date: 20.06.2013
 * Time: 12:05
 */

var redis = require('redis');

/**
 * Create a new redis store
 *
 * @param options
 * @constructor
 */

function RedisStore(options) {
  options = options || {};

  this.client = options.client || new redis.createClient(options.port || options.socket, options.host, options);
  if (options.pass) {
    this.client.auth(options.pass, function(err){
      if (err) throw err;
    });
  }

  this.collectionName = options.collectionName || 'visitors-log'
}

/**
 * Log request object
 *
 * @param obj
 */

RedisStore.prototype.log = function(obj) {
  obj = JSON.stringify(obj);
  this.client.rpush(this.collectionName, obj, function(err) {
    if (err) throw err;
  });
};

exports = module.exports = RedisStore;
