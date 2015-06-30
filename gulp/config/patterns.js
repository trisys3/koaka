module.exports = {
  js: {
    entry: 'app.js',
    check: {
      gulp: 'gulp/**/*.js',
      server: ['**/server/**.js', '!**/node_modules/**.js'],
      app: ['**/app/**.js', '!**/node_modules/**.js']
    },
    endFile: 'app.js'
  }
};
