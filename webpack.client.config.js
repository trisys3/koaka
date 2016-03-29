'use strict';

const webpack = require(`webpack`);

const autoprefixer = require(`autoprefixer`);
const postcssReporter = require(`postcss-reporter`);
const HMR = webpack.HotModuleReplacementPlugin;

// linting options
const lint = exports.lint = {
  js: {

  },
  css: {

  },
  html: {
    'href-style': true,
  },
};

// minification options
const minify = {};

minify.urls = {
  // this option from the library has an underscore
  /* eslint camelcase: 0 */
  ignore_www: true,
};
minify.js = {

};
minify.css = {

};
minify.html = {
  removeComments: true,
  removeCommentsFromCDATA: true,
  removeCDATASectionsFromCDATA: true,
  collapseWhitespace: true,
  conservativeCollapse: true,
  collapseBooleanAttributes: true,
  removeAttributeQuotes: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  removeOptionalTags: true,
  // lint: lint.html,
  minifyJS: minify.js,
  minifyCSS: minify.css,
  minifyURLs: minify.urls,
};

exports.minify = minify;

const config = {
  entry: {
    app: `${__dirname}/app.js`,
  },
  output: {
    filename: `[name].[hash].js`,
    chunkFilename: `[name].[hash].[chunkhash].js`,
  },
  module: {
    preLoaders: [
      {
        test: /\.png$|\.jpg$|\.gif$/,
        loader: `img`,
        query: {
          minimize: true,
        },
      },
    ],
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
        test: /\.styl$/,
        loaders: [
          `style`,
          `css?sourceMap`,
          `postcss`,
          `stylus?sourceMap`,
        ],
      },
      {
        test: /\.png$|\.jpg$|\.gif$/,
        loader: `url`,
        query: {
          name: `[sha512:hash].[ext]`,
        },
      },
      {
        test: /\.json$/,
        loader: `json`,
      },
      {
        test: /\.html$/,
        loader: `html`,
        query: {
          minimize: lint.html,
        },
      },
    ],
    resolve: {
      extensions: [``, `.js`, `.json`, `.styl`],
    },
  },
  postcss() {
    return [
      autoprefixer,
      postcssReporter({
        clearMessages: true,
      }),
    ];
  },
  watch: true,
  devtool: `source-map`,
  plugins: [
    new HMR(),
  ],
};

Object.assign(exports, config);
