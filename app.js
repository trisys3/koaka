const css = require('./app.styl');
const io = require('socket.io-client');
const socket = io('http://dev.koaka.io:3000');

require.ensure('./angular', function(ensureRequire) {
  console.log('Angular is required');

  if(module.hot) {
    module.hot.accept();
    socket.on('hot-update', function(data) {
      module.hot.check(function(err, newMods) {
        module.hot.apply();
      });
    });
  }

}, 'angularRequire');
