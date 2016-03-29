'use strict';

let yargs = require(`yargs`);
const stripJsonComments = require(`strip-json-comments`);
const Sockets = require(`socket.io`);
const fs = require(`fs`);

// global argument configuration
yargs = yargs
  .env()
  .options({
    config: {
      config: true,
      configParser: configPath => {
        try {
          return JSON.parse(stripJsonComments(fs.readFileSync(configPath, `utf8`)));
        }
        catch(e) {
          // the file probably just does not exist, which is perfectly fine
          // for us, so we'll just pass an empty object
          return {};
        }
      },
      description: `Path to a file with all default configuration options. Defaults to ".koakarc", in the style of common Linux & node utilities' configuration file paths. Comments are stripped out.`,
      default: `.koakarc`,
    },
  });

// global argument options, that depend on nothing but the global argument
// configuration but that aother arguments may depend on
yargs = yargs
  .options({
    env: {
      type: `string`,
      description: `Server's phase of development`,
      default: process.env.NODE_ENV || `development`,
    },
  });

// 1st-level arguments, that rely on nothing but maybe global constants
yargs = yargs
  .options({
    name: {
      type: `string`,
      description: `Name of the server`,
      default: `Koaka`,
    },
    hostname: {
      type: `string`,
      description: `Hostname the server uses.`,
      default: `koaka.io`,
    },
    basePort: {
      type: `number`,
      alias: `bp`,
      description: `Base port for the web server, defaulting to the NodeJS default of 3000.`,
      default: 3000,
    },
    offsetPort: {
      type: `number`,
      alias: `op`,
      description: `Offset port for the webserver. Defaults to having no offset, meaning the server just uses the base port.`,
      default: 0,
    },
    clientOffsetPort: {
      type: `number`,
      alias: `cop`,
      description: `Offset port for the port the test client is using to connect from the Vagrant or Docker virtual machine to the server, defaulting to no offset.`,
      default: 0,
    },
  });

// 2nd-level configuration, that depends on the 1st-level configuration
yargs = yargs
  .options({
    port: {
      type: `number`,
      alias: `p`,
      description: `Set the port explicitly, rather than adding the main & offset ports.`,
      default: yargs.argv.basePort + yargs.argv.offsetPort,
    },
    clientBasePort: {
      type: `number`,
      alias: `cbp`,
      description: `Base port for the port the test client is using to connect from the Vagrant or Docker virtual machine to the server, defaulting to the server port.
        NOTE: In the future, this will be gotten from the API of VirtualBox, Docker, or whatever virtual machine system is specified, so it will not usually need to be set explicitly.`,
      default: yargs.argv.basePort,
    },
  });

// 3rd-level argument configuration, usually we will not need to go past this
yargs = yargs
  .options({
    clientPort: {
      type: `number`,
      alias: `cp`,
      description: `Set the port explicitly, rather than adding the main & offset ports.`,
      default: yargs.argv.clientBasePort + yargs.argv.clientOffsetPort,
    },
  });

Object.assign(exports, yargs.argv);

// basic application information
// get the webpack configuration
exports.webpack = require(`./webpack.client.config`);

// Content-Security-Policy configuration
exports.csp = {
  // by default only allow connections from our sites
  'default-src': [`'self'`],
  // only allow JavaScript code from our sites
  'script-src': [`'self'`],
  // only allow CSS styles from our sites
  'style-src': [`'self'`, `blob:`],
  // only allow images from our sites and data-uri's
  'img-src': [`'self'`, `data:`],
  // only allow partial-page connections (XHR, WebSockets, etc.) from our
  // sites
  'connect-src': [`'self'`, `ws://${yargs.argv.hostname}:${yargs.argv.clientPort}`],
  // only allow fonts from our sites
  'font-src': [`'self'`],
  // do not allow Flash on our sites
  'object-src': [`'none'`],
  // do not allow embedding of <iframe>s in our sites
  'frame-src': [`'none'`],
  // only allow video & audio from our sites
  'media-src': [`'self'`],
  // URL to send reports of violations to
  'report-uri': [`/csp-report`],
};

exports.socket = new Sockets();
