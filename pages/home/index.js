'use strict';

const koa = require(`koa`);
const mount = require(`koa-mount`);

const homeRoutes = koa();
const homeCtrl = require(`./controllers/home`);

module.exports = homeConfig;

function homeConfig() {
  // create the namespace for the home page
  homeRoutes.use(function *ioHomeNsp(next) {
    // create a custom namespace for this part of the site
    this.homeNsp = this.io.of(`/home`);

    yield next;

    // delete the SocketIO "home" namespace so the higher-level modules can not
    // access it as koa "unwinds"
    delete this.homeNsp;
  });

  homeRoutes.use(mount(homeCtrl()));

  return homeRoutes;
}
