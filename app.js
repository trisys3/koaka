module.exports = function() {
  console.log(process.env);

  var css = require('./app.styl');
};

require.ensure('angular', function(require) {
  console.log('Angular is required');

  if(module.hot) {
    module.hot.accept();
    module.hot.apply();
  }
}, 'angularRequire');
