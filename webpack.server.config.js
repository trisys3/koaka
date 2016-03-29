'use strict';

// const fs = require(`fs`);
const pkg = require(`${process.cwd()}/package.json`);
const webpack = require(`webpack`);

// minification options
exports.minify = {};
exports.minify.urls = {
  /* eslint "camelcase": "off" */
  ignore_www: true,
};
exports.minify.js = {

};

const nodeModules = {};

for(const dep in pkg.dependencies) {
  nodeModules[dep] = `commonjs ${dep}`;
}

const config = {
  entry: {
    index: `${__dirname}/server.js`,
  },
  output: {
    filename: `[name].[hash].js`,
    chunkFilename: `[name].[hash].[chunkhash].js`,
    path: `${process.cwd()}/dist`,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: `babel`,
        query: {
          cacheDirectory: true,
        },
      },
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
  externals: nodeModules,
  plugins: [
    new webpack.BannerPlugin(`require('source-map-support').install();`,
      {
        raw: true,
        entryOnly: false,
      }),
  ],
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
