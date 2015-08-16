#!/usr/bin/env node

'use strict';

const chalk = require(`chalk`);
const koa = require(`koa`);
const logger = require(`koa-json-logger`);
const compress = require(`koa-compressor`);
const vhost = require(`vhost-koa`);
const helmet = require(`koa-helmet`);

const config = require(`./config/config`);

// server & its virtual hosts
const server = koa();
const vhosts = koa();

// give the server a name
server.name = config.name;

// set the phase of development for the app
server.env = config.phase;

// log some general information about the application
console.log(chalk.green(`Environment: ${config.phase}`));
console.log(chalk.green(`Hostname(s): ${config.host}`));
console.log(chalk.green(`Port: ${config.port}`));
console.log(chalk.green(`Application ${config.name} started at ${new Date()}`));

// compression middleware
vhosts.use(compress());

// set up our middleware logger, which must be done before anything else
vhosts.use(logger({
  name: config.name,
  path: `logs/koa-logger`,
}));

// add certain headers for protection
vhosts.use(helmet());
vhosts.use(helmet.csp(config.csp));

const fs = require(`fs`);
const path = require(`path`);

// routing
server.use(function *routing(next) {
  // // get the routing file
  // const routes = require(`./modules/server/routes`);

  // yield* routes.call(this);
  // yield next;
});

// restrict the server to the hostname we set
server.use(vhost(config.host, vhosts));

// listen on some ports
server.listen(config.port);

module.exports = server;
