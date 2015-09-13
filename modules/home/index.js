'use strict';

const koa = require(`koa`);
const hbs = require(`koa-handlebars`);
const mount = require(`koa-mount`);

const homeRoutes = koa();
const homeCtrl = require(`./controllers/home`);

module.exports = homeConfig;

function homeConfig() {
  homeRoutes.use(hbs({
    viewsDir: `${__dirname}/views`,
    extension: [`html`, `hbs`],
    defaultLayout: `main`,
  }));

  homeRoutes.use(mount(homeCtrl()));

  return homeRoutes;
}
