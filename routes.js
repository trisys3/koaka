'use strict';

module.exports = findRoutes;

function findRoutes(config) {
  const path = require(`path`);
  const home = require(`./pages/home`)(config);
  //const docs = require(`./pages/docs`);

  return function *allRoutes(next) {
    // set the mounted path to the full URL
    const mountPath = path.normalize(this.path);

    // use the docs module
    if(mountPath.startsWith(`/docs`)) {
      // set the mount path first
      this.mountPath = mountPath.replace(/^\/docs/, `/`);
      //yield* docs();
    }

    // use the home module
    else {
      // do not set the mount path, as it is the same anyway
      yield home.call(this, next);
    }
  };
}
