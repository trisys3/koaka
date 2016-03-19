'use strict';

const webpack = require(`webpack`);
const IndexHtml = require(`html-webpack-plugin`);
const chok = require(`chokidar`);

module.exports = homePage;

function homePage(config) {
  // add webpack properties that include the path
  config.webpack.entry.app = `${__dirname}/app.js`;
  config.webpack.output.path = `${__dirname}/${config.env}`;
  config.webpack.plugins.push(new IndexHtml({
    template: `${__dirname}/index.html`,
    inject: true,
    minify: config.webpack.minify.html,
  }));

  // compile the module with webpack
  webpack(config.webpack, () => {
    // watch all hot update files in the compilation folder
    const hotUpdWatch = chok.watch(`*.hot-update.json`, {
      cwd: `${__dirname}/${config.env}`,
      // ignore hidden files
      ignored: /^\./,
    });

    config.socket.on(`connection`, io => {
      // whenever a hot-update file gets created, emit a hot-update event to all
      // sockets connected to this page
      // we do this in the koa request-response cycle so we make sure sockets
      // are listening first
      hotUpdWatch.on(`add`, () => {
        io.emit(`hot-update`);
      });
    });
  });

  return (ctx, next) => {
    const fs = require(`fs`);
    const mime = require(`mime`);

    if(ctx.path === `/` || ctx.path === `/index.html`) {
      ctx.type = `html`;
      ctx.body = fs.readFileSync(`${__dirname}/${config.env}/index.html`, `utf-8`);
    }
    else {
      ctx.type = mime.lookup(ctx.path);
      ctx.body = fs.readFileSync(`${__dirname}/${config.env}/${ctx.path}`, `utf-8`);
    }

    return next();
  };
}
