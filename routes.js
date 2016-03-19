'use strict';

module.exports = findRoutes;

function findRoutes(config) {
  const root = require(`./backend/`)(config);

  return (ctx, next) => root(ctx, next);
}
