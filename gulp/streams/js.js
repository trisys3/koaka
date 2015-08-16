'use strict';

const config = require(`../config/config`);
const patterns = require(`../config/patterns`);

const webpackConfig = require(`../../webpack/js`);

const lazypipe = require(`lazypipe`);
const eslint = require(`gulp-eslint`);
const webpack = require(`webpack-stream`);

exports.check = lazypipe()
  .pipe(eslint)
  .pipe(eslint.format)
  .pipe(eslint.failAfterError);

exports.build = lazypipe()
  .pipe(webpack, webpackConfig);
