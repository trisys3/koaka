'use strict';

var chalk = require('chalk');
var koa = require('koa');
var logger = require('koa-json-logger');
var compress = require('koa-compressor');
var vhost = require('vhost-koa');

var config = require('./config/config');
var app = require('./config/koa');

// server & its virtual hosts
var server = koa();
var vhosts = koa();

// give the server a name
server.name = config.name;

// set the phase of development for the app
server.env = config.env;

// log some general information about the application
console.log(chalk.green('Environment: ' + config.env || 'development'));
if(!Array.isArray(config.hosts)) {
  config.hosts = [config.hosts];
}
for(let host of config.hosts) {
  console.log(chalk.green('Hostname(s): ' + host));
}
console.log(chalk.green('Port: ' + config.port));
console.log(chalk.green('Application ' + config.name + ' started at ' + new Date()));

server.use(compress());

// set up our middleware logger, which must be done before anything else
server.use(logger({
  name: config.name
}));

// general middleware
app(server);

// restrict the server to the hostnames we set
for(let host of config.hosts){
  vhosts.use(vhost(host, server));
}

// listen on some ports
vhosts.listen(config.port);

module.exports = vhosts;
