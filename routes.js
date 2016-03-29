'use strict';

module.exports = findRoutes;

function findRoutes(config) {
  const root = require(`./frontend/`)(config);

  return (ctx, next) => root(ctx, next);
}
