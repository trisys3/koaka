'use strict';

const homeCtrl = require(`./controllers/home`);

module.exports = homeConfig;

function homeConfig(config) {
  // use the "home" namespace for SocketIO
  config.homeSocket = config.socket.of(`/home`);

  const controller = homeCtrl(config);

  function *homeRoutes(next) {
    yield controller.call(this, next);
  }

  return homeRoutes;
}
