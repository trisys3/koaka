'use strict';

const serveStatic = require(`koa-static`);

const webpack = require(`webpack`);
const indexHtml = require(`html-webpack-plugin`);
const chok = require(`chokidar`);
const fs = require(`fs`);
const merge = require(`merge`);

module.exports = homePage;

function homePage(config) {
  // webpack Hot Module Replacement watcher
  let hotUpdWatch;

  // add webpack properties that include the path
  config.webpack.entry.app = `${__dirname}/../app.js`;
  config.webpack.output.path = `${__dirname}/../${config.env}`;
  config.webpack.plugins.push(new indexHtml({
    template: `${__dirname}/../index.html`,
    inject: true,
    minify: config.webpack.minify.html,
  }));

  // compile the module with webpack
  webpack(config.webpack, function webpackCb(err, stats) {
    // watch all hot update files in the compilation folder
    hotUpdWatch = chok.watch(`*.hot-update.json`, {
      cwd: `${__dirname}/../${config.env}`,
      //ignore hidden files
      ignored: /^\./
    });

    config.homeSocket.on('connection', function(io) {
      // whenever a hot-update file gets created, emit a hot-update event to all
      // sockets connected to this page
      // we do this in the koa request-response cycle so we make sure sockets are
      // listening first
      hotUpdWatch.on(`add`, function(path) {
        io.emit(`hot-update`);
      });
    });
  });

  return function *homeCtrl(next) {
    yield serveStatic(`${__dirname}/../${config.env}`, {defer: true}).call(this, next);
  };
}
