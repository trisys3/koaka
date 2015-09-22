'use strict';

const serveStatic = require(`koa-serve-static`);
const koa = require(`koa`);

const webpack = require(`webpack`);

const webpackConfig = require(`../webpack.config`);

const homeCtrl = koa();

module.exports = homePage;

// compile the module with webpack
webpack(webpackConfig, function webpackCb(err, comp) {

});

// this page's data
function homePage() {
  homeCtrl.use(serveStatic(`${__dirname}/../${process.env.NODE_ENV || `development`}`));

  return homeCtrl;
}
