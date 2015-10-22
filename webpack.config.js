'use strict';

const webpack = require(`webpack`);

const autoprefixer = require(`autoprefixer-core`);
const postcssReporter = require(`postcss-reporter`);
const HMR = webpack.HotModuleReplacementPlugin;

// linting options
exports.lint = {
  js: {

  },
  css: {

  },
  html: {
    'href-style': true,
  },
};

// minification options
exports.minify = {};
exports.minify.urls = {
  ignore_www: true,
},
exports.minify.js = {
  
};
exports.minify.css = {
  
};
exports.minify.html = {
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
  minifyJS: exports.minify.js,
  minifyCSS: exports.minify.css,
  minifyURLs: exports.minify.urls
};

var config = {
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
      extensions: [``, `.js`, `.json`, `.styl`],
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
  watch: true,
  devtool: `source-map`,
  plugins: [
    new HMR(),
  ],
};

Object.assign(exports, config);
