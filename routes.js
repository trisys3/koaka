'use strict';

var koa = require(`koa`);
var routes = koa();

module.exports = findRoutes;

function findRoutes() {
  const path = require(`path`);
  const home = require(`./modules/home`);
  //const docs = require(`./modules/docs`);

  return function *allRoutes() {
    // set the mounted path to the full URL
    const mountPath = path.normalize(this.path);

    // use the docs module
    if(mountPath.startsWith(`docs`)) {
      // set the mount path first
      this.mountPath = mountPath.replace(/^\/docs/, ``);
      //yield *docs();
    }
    // use the home module
    else {
      // do not set the mount path, as it is the same anyway
      yield home();
    }
  };
}
