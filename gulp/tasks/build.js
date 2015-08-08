'use strict';

const buildStreams = require(`../streams/build`);
const patterns = require(`../config/patterns`);
const config = require(`../config/config`);

const gulp = require(`gulp`);

gulp.task(`build`, function() {
  return gulp.src(patterns.js.entry)
    .pipe(buildStreams.build())
    .pipe(gulp.dest(patterns.build[config.env]));
});
