'use strict';

/* Development Environment
 * Specifically crafted for ease of development */

const yargs = require(`yargs`)
  .env();
const argv = yargs.argv;

const host = argv.devHost || argv.host || `koaka.dev`;

const mainPort = argv.devPort || argv.port || 3000;
const offsetPort = argv.devOffsetPort || argv.offsetPort || 0;

exports.port = mainPort + offsetPort;
exports.host = host;
