'use strict';

const autoprefixer = require(`autoprefixer-core`);
const postcssReporter = require(`postcss-reporter`);

var config = {
  entry: {
    app: `./app.js`,
  },
  output: {
    filename: `[name].js`,
    chunkFilename: `[name].js`,
    path: `${process.cwd()}/dev/`,
  },
  module: {
    preLoaders: [
      {
        test: /\.png$|\.jpg$|\.gif$/,
        loader: `img?minimize`,
      },
    ],
    loaders: [
      {
        test: /\.styl$/,
        loaders: [
          `style`,
          `css?sourceMap`,
          `postcss`,
          `stylus?sourceMap`,
        ]
      },
      {
        test: /\.png$|\.jpg$|\.gif$/,
        loader: `url?name=[sha512:hash].[ext]`,
      },
      {
        test: /\.json$/,
        loader: `json`,
      },
    ],
    resolve: {
      extensions: [``, `.js`, `.styl`],
    },
  },
  postcss: function() {
    return [
      autoprefixer,
      postcssReporter({
        clearMessages: true,
      }),
    ];
  },
  devtool: `sourcemap`,
  recordsInputPath: process.cwd() + `/logs/webpack/in.log`,
  recordsOutputPath: process.cwd() + `/logs/webpack/out.log`,
};

module.exports = config;
