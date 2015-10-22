'use strict';

/* Production Environment
 * Environment for testing production-level code before it goes live */

var yargs = require('yargs').argv;

// general extra settings for this environment
exports.host = yargs.prodHost || process.env.PROD_HOST || 'koaka.io';
exports.port = yargs.prodOffsetPort || process.env.PROD_OFFSET_PORT;
