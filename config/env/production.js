'use strict';

/* Production Environment
 * Environment for testing production-level code before it goes live */

var yargs = require('yargs');

// general extra settings for this environment
exports.phase = 'production';
exports.hosts = ['prod.koaka.io'];
exports.port = yargs.prodOffsetPort || process.env.PROD_OFFSET_PORT || yargs.offsetPort || process.env.OFFSET_PORT || 0;
