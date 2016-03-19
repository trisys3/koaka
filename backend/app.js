// connect to the home SocketIO namespace
const io = require('socket.io-client');
const socket = io(`${document.location.origin}`);

require('./app.styl');

if(module.hot) {
  module.hot.accept();
  socket.on(`hot-update`, () => {
    module.hot.check(() => {
      module.hot.apply();
    });
  });
}
