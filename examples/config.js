/**
 * Author: Tymoteusz Paszun
 * Date: 20.06.2013
 * Time: 22:06
 */

exports = module.exports;

var configLoader = require('env-config-loader');

exports = configLoader({
  redis: {
    host: {
      'default': '127.0.0.1',
      envVar: 'CONFIG_REDIS_HOST'
    },
    port: {
      'default': '6379',
      envVar: 'CONFIG_REDIS_PORT'
    },
    pass: {
      'default': '',
      envVar: 'CONFIG_REDIS_PASS'
    }
  }
});
