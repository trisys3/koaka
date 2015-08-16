'use strict';

const ETP = require(`extract-text-webpack-plugin`);

const postcssImport = require(`postcss-import`);
const autoprefixer = require(`autoprefixer-core`);
const postcssReporter = require(`postcss-reporter`);

const yargs = require(`yargs`);

var config = {
  entry: {
    app: `./app.js`,
  },
  output: {
    filename: `[name].js`,
    chunkFilename: `[name].js`,
  },
  watch: yargs.argv.watch,
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
        loader: ETP.extract(`css?sourceMap!stylus?sourceMap`),
      },
      {
        test: /\.png$|\.jpg$|\.gif$/,
        loader: `url?name=[sha512:hash].[ext]`,
      },
    ],
    resolve: {
      extensions: [``, `.js`, `.styl`],
    },
  },
  postcss: function() {
    return [
      postcssImport({
        onImport: function(files) {
          files.forEach(this.addDependency);
        }.bind(this),
      }),
      autoprefixer,
      postcssReporter({
        clearMessages: true,
      }),
    ];
  },
  plugins: [
    new ETP(`app.css`),
  ],
  devtool: `sourcemap`,
  recordsInputPath: process.cwd() + `/logs/webpack.in`,
  recordsOutputPath: process.cwd() + `/logs/webpack.out`,
};

module.exports = config;
