require('./app.styl');
const io = require('socket.io-client');
const socket = io('http://dev.koaka.io:3000');

require.ensure('./angular', () => {
  console.log(`Angular is required`);

  if(module.hot) {
    module.hot.accept();
    socket.on(`hot-update`, () => {
      module.hot.check(() => {
        module.hot.apply();
      });
    });
  }
}, 'angularRequire');
