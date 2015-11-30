'use strict';

module.exports = findRoutes;

function findRoutes(config) {
  const path = require(`path`);
  const home = require(`./pages/home`)(config);
  // const root = require(`./pages/root`)(config);
  // const docs = require(`./pages/docs`)(config);

  return (ctx, next) => {
    // store the full URL so we can use it when koa unwinds
    const fullUrl = path.normalize(ctx.url);
    let subApp;

    // use the docs module
    if(fullUrl.startsWith(`/docs`)) {
      // subApp = docs;
      // ctx.url = fullUrl.replace(/^\/docs/, `/`);
    }
    // use the home module
    else if(fullUrl.startsWith(`/home`)) {
      subApp = home;
      ctx.url = fullUrl.replace(/^\/home/, `/`);
    }
    // use the root path
    else {
      // subApp = root;
      // do not change the URL because it is already what we want
    }

    return subApp(ctx, next)
      .then(() => {
        // restore the full path for the unwinding
        ctx.url = fullUrl;
      });
  };
}
