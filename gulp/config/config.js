var yargs = require('yargs');

exports.transforms = [];

exports.check = {
  js: yargs.argv.jsCheck || process.env.JS_CHECK || yargs.argv.check || process.argv.CHECK
};

exports.build = {
  js: yargs.argv.jsBuild || process.env.JS_BUILD || yargs.argv.build || process.argv.BUILD
};

exports.watch = yargs.argv.watch || process.env.WATCH;

exports.env = yargs.argv.phase || process.env.NODE_ENV || 'development';

exports.sourceMaps =  yargs.argv.sourceMaps || process.env.SOURCE_MAPS || (exports.env === 'development');
