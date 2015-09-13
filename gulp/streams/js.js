'use strict';

const config = require(`../config/config`);
const patterns = require(`../config/patterns`);

const lazypipe = require(`lazypipe`);
const eslint = require(`gulp-eslint`);
const webpack = require(`webpack-stream`);

exports.check = lazypipe()
  .pipe(eslint)
  .pipe(eslint.format)
  .pipe(eslint.failAfterError);
