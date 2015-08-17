'use strict';

module.exports = {
  js: {
    entry: `app.js`,
  },
  check: {
    js: {
      gulp: `gulp/**/*.js`,
      server: [`server.js`, `**/server/**.js`, `!**/node_modules/**.js`],
      app: [`**/app/**.js`, `!**/node_modules/**.js`],
    },
  },
  images: `images/`,
  build: {
    dev: `dev/`,
    prod: `release/`,
  },
};