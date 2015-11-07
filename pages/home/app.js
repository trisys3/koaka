// connect to the home SocketIO namespace
const io = require('socket.io-client');
const socket = io(`${document.location.origin}/home`);

if(module.hot) {
  module.hot.accept();
  socket.on(`hot-update`, function(data) {
    module.hot.check(function(err, newMods) {
      module.hot.apply()
    });
  });
}
