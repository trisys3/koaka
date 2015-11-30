'use strict';

const webpack = require(`webpack`);

// linting options
exports.lint = {
  js: {

  },
};

// minification options
exports.minify = {};
exports.minify.urls = {
  ignore_www: true,
},
exports.minify.js = {
  
};

var config = {
  entry: {
    index: `${__dirname}/server.js`,
  },
  output: {
    filename: `[name].[hash].js`,
    chunkFilename: `[name].[hash].[chunkhash].js`,
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: `json`,
      },
      {
        test: /\.coffee$/,
        loader: `coffee`,
      },
    ],
    resolve: {
      extensions: [``, `.js`, `.json`],
    },
  },
  target: `node`,
  node: {
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false,
  },
  watch: true,
  devtool: `source-map`,
};

Object.assign(exports, config);
