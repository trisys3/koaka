'use strict';

/* Development Environment
 * Specifically crafted for ease of development */

var yargs = require('yargs').argv;

// general extra settings for this environment
exports.host = yargs.devHost || process.env.DEV_HOST || 'dev.koaka.io';
exports.port = yargs.devOffsetPort || process.env.DEV_OFFSET_PORT;
