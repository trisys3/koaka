'use strict';

var helmet = require('koa-helmet');

var config = require('./config');

var app = function app(server) {
  // use the helmet middleware we specified
  Object.keys(config.helmet).forEach(function headerMiddleware(header) {
    server.use(helmet[header](config.helmet[header]));
  });

  server.use(function* bodyMiddleware (next) {
    this.body = 'Hello World';
    yield next;
  });
};

module.exports = app;
