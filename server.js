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

server.use(function *mimeTypes(next) {
  const mime = require(`mime`);

  const stats = fs.statSync(`dev/${this.path}`);
  // if the path is a folder, get its index.html file
  if(stats.isDirectory()) {
    this.type = mime.lookup(`html`);
    this.body = fs.createReadStream(`dev/${this.path}index.html`);
  }
  else {
    this.type = mime.lookup(this.path);
    this.body = fs.createReadStream(`dev/${this.path}`);
  }
  yield next;
});

const routes = require(`./modules/server/routes`);

// routing
server.use(routes());

// restrict the server to the hostname we set
server.use(vhost(config.host, vhosts));

// listen on some ports
server.listen(config.port);

module.exports = server;
