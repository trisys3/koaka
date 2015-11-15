#!/usr/bin/env node

'use strict';

// third-party components
const chalk = require(`chalk`);
const Koa = require(`koa`);
const logger = require(`koa-json-logger`);
const compress = require(`koa-compressor`);
const helmet = require(`koa-helmet`);
const http = require(`http`);
const convert = require(`koa-convert`);

// first-party components
const config = require(`./config`);

// our main koa & SocketIO servers
const server = module.exports = new Koa();

// get the routes
const allRoutes = require(`./routes`)(config);

// give the server a name
server.name = config.name;

// set the phase of development for the app
server.env = config.env;

// log some general information about the application
console.log(chalk.green(`Environment: ${config.env}`));
console.log(chalk.green(`Hostname(s): ${config.host}`));
console.log(chalk.green(`Port: ${config.port}`));
console.log(chalk.green(`Application ${config.name} started at ${new Date()}`));

// compression middleware
server.use(convert(compress()));

// our JSONAPI logger
server.use(convert(logger({
  name: config.name,
  path: `logs/koa-logger`,
})));

// add certain headers for protection
server.use(convert(helmet()));
server.use(convert(helmet.csp(config.csp)));

server.use(allRoutes);

// create a NodeJS server with the content of our koa application
const app = http.createServer(server.callback());

// have all server components listen
app.listen(config.port);
config.socket.listen(app);
