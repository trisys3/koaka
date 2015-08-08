'use strict';

const config = require(`../config/config`);
const patterns = require(`../config/patterns`);

const webpackConfig = require(`../../webpack.config`);

const webpack = require(`webpack-stream`);
const lazypipe = require(`lazypipe`);

exports.build = lazypipe()
  .pipe(webpack, webpackConfig);
