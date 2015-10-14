'use strict';

const homeCtrl = require(`./controllers/home`);

module.exports = homeConfig;

function homeConfig(socket) {
  // use the "home" namespace for SocketIO
  const homeSocket = socket.of(`/home`);

  const controller = homeCtrl(homeSocket);

  function *homeRoutes(next) {
    yield controller.call(this, next);
  }

  return homeRoutes;
}
