'use strict';

var config = require('../config/config');
var patterns = require('../config/patterns');

var browserify = require('browserify');
var watchify = require('watchify');
var through = require('through2');
var lazypipe = require('lazypipe');
var source = require('vinyl-source-stream');
var map = require('vinyl-map');

var eslint = require('gulp-eslint');

exports.check = lazypipe()
  .pipe(eslint)
  .pipe(eslint.format)
  .pipe(eslint.failAfterError);

exports.build = function() {
  var bundle = browserify({
    extensions: ['.js', '.json', '.coffee'],
    debug: config.sourceMaps,
    entries: 'app.js',
    cache: config.watch,
    packageCache: config.watch
  });

  if(!Array.isArray(config.transforms)) {
    config.transforms = [config.transforms];
  }
  for(transform of config.transforms) {
    if(transform) {
      bundle = bundle
        .transform(config.transforms);
    }
  }

  if(config.watch) {
    bundle = watchify(bundle);
  }

  bundle = bundle
    .bundle()
    .pipe(source(patterns.js.endFile));

  return bundle;
};
