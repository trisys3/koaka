'use strict';

const yargs = require(`yargs`);

var config = {
  entry: `./app.js`,
  output: {
    filename: `bundle.js`,
  },
  watch: yargs.argv.watch,
  devtool: `sourcemap`,
};

module.exports = config;
