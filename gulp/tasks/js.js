'use strict';

const config = require(`../config/config`);
const jsStreams = require(`../streams/js`);
const patterns = require(`../config/patterns`);

const gulp = require(`gulp`);
const merge = require(`merge-stream`);

const check = function jsCheck() {
  return gulp.src(patterns.check.js[config.check.js])
    .pipe(jsStreams.check());
};

const build = function jsBuild() {
  return gulp.src(patterns.js.entry)
    .pipe(jsStreams.build())
    .pipe(gulp.dest(patterns.build[config.env]));
};

gulp.task(`js`, function jsTask() {
  const tasks = [];

  if(config.check.js) {
    tasks.push(check());
  }
  if(config.build.js) {
    tasks.push(build());
  }

  return merge(tasks);
});
