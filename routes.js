'use strict';

const koa = require(`koa`);
const mount = require(`koa-mount`);

const routes = koa();

module.exports = findRoutes;

function findRoutes() {
  const home = require(`./pages/home`);
  //const docs = require(`./modules/docs`);

  routes.use(mount(home()));
  //routes.use(mount(`/docs`, docs()));

  return routes;
}
