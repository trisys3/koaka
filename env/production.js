'use strict';

/* Production Environment
 * Environment for testing production-level code before it goes live */

const yargs = require(`yargs`)
  .env();
const argv = yargs.argv;

const host = argv.prodHost || argv.host || `koaka.io`;

const mainPort = argv.prodPort || argv.port || 4000;
const offsetPort = argv.prodOffsetPort || argv.offsetPort || 0;

exports.host = host;
exports.port = mainPort + offsetPort;
