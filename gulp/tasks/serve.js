'use strict';

const gulp = require(`gulp`);

const serverStreams = require(`../streams/server`);
const patterns = require(`../config/patterns`);
const config = require(`../config/config`);

gulp.task(`serve`, function serveStream() {
  return gulp.src(patterns[config.phase].src, {cwd: patterns[config.phase].root})
    .pipe(serverStreams.serve())
    .pipe(gulp.dest(patterns[config.phase].dest));
});
