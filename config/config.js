'use strict';

const yargs = require(`yargs`).argv;

// set node's phase of development, defaulting to "development"
exports.env = process.env.NODE_ENV || `development`;
let env;

try {
  env = require(`./env/${exports.env}`);
}
catch(e) {
  console.log(`Could not find environment file, using "development" as environment instead`);
  exports.env = `development`;

  env = require(`./env/development`);
}

// basic application information
exports.name = `Koaka`;
exports.host = env.host;

// get the base port that will be added to for each run of the site
var basePort = yargs.basePort || process.env.BASE_PORT || 3000;
// get the offset port from the environment so each environment can have its own
// default
var offsetPort = env.port || 0;
// put the base & offset ports together to come up with the final server port
exports.port = basePort + offsetPort;

// Content-Security-Policy configuration
exports.csp = {
  // by default only allow connections from our sites
  'default-src': ["'self'"],
  // only allow JavaScript code from our sites
  'script-src': ["'self'"],
  // only allow CSS styles from our sites
  'style-src': ["'self'", "blob:"],
  // only allow images from our sites and data-uri's
  'img-src': ["'self'", 'data:'],
  // only allow partial-page connections (XHR, WebSockets, etc.) from our
  // sites
  'connect-src': ["'self'", 'ws://' + env.host + ':' + exports.port],
  // only allow fonts from our sites
  'font-src': ["'self'"],
  // do not allow Flash on our sites
  'object-src': ["'none'"],
  // do not allow embedding of <iframe>s in our sites
  'frame-src': ["'none'"],
  // only allow video & audio from our sites
  'media-src': ["'self'"],
  // URL to send reports of violations to
  'report-uri': ['/csp-report'],
};
