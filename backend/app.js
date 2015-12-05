// connect to the home SocketIO namespace
const io = require('socket.io-client');
const stylus = require('./app.styl');
const socket = io(`${document.location.origin}`);

if(module.hot) {
  module.hot.accept();
  socket.on(`hot-update`, function(data) {
    module.hot.check(function(err, newMods) {
      module.hot.apply();
    });
  });
}
