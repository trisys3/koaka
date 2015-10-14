'use strict';

const serveStatic = require(`koa-static`);

const webpack = require(`webpack`);
const socket = require(`socket.io`);
const chok = require(`chokidar`);

// webpack Hot Module Replacement watcher
let hotUpdWatch;

const webpackConfig = require(`../webpack.config`);

module.exports = homePage;

// compile the module with webpack
webpack(webpackConfig, function webpackCb(err, comp) {
  // after compilation is done, watch the hot update files
  hotUpdWatch = chok.watch(`*.hot-update.json`, {
    cwd: `${__dirname}/../${process.env.NODE_ENV || `development`}`,
    //ignore hidden files
    ignored: /^\./
  });
});

// this page's data
function homePage(socket) {
  socket.on('connection', function(io) {
    // whenever a hot-update file gets created, emit a hot-update event to all
    // sockets connected to this page
    // we do this in the koa request-response cycle so we make sure sockets are
    // listening first
    hotUpdWatch.on(`add`, function(path) {
      io.emit(`hot-update`);
    });
  });

  return function *homeCtrl(next) {
    yield serveStatic(`${__dirname}/../${process.env.NODE_ENV || `development`}`, {defer: true}).call(this, next);
  };
}
