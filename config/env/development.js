'use strict';

/* Development Environment
 * Specifically crafted for ease of development */

var yargs = require('yargs');

// general extra settings for this environment
exports.phase = 'development';
exports.hosts = ['dev.koaka.io'];
exports.port = yargs.devOffsetPort || process.env.DEV_OFFSET_PORT || yargs.offsetPort || process.env.OFFSET_PORT || 1;
