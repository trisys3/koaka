'use strict';

var config = require('../config/config');
var jsStreams = require('../streams/js');
var patterns = require('../config/patterns').js;

var gulp = require('gulp');
var es = require('event-stream');

var check = function() {
  return gulp.src(patterns.check[config.check.js])
    .pipe(jsStreams.check());
};

var build = function() {
    return jsStreams.build()
      .pipe(gulp.dest('app/'));
};

gulp.task('js', function() {
  var tasks = [];
  
  if(config.check.js) {
    tasks.push(check());
  }
  if(config.build.js) {
    tasks.push(build());
  }

  return es.merge(tasks);
});
