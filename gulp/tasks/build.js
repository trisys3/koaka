'use strict';

const buildStreams = require(`../streams/build`);
const patterns = require(`../config/patterns`);
const config = require(`../config/config`);

const gulp = require(`gulp`);

gulp.task(`html.index`, function htmlIndex() {
  return gulp.src(patterns.html.index)
    .pipe(gulp.dest(patterns.build[config.env]));
});

gulp.task(`webpack`, function webpack(data, res) {
  return gulp.src(patterns.js.entry)
    .pipe(buildStreams.build())
    .pipe(gulp.dest(patterns.build[config.env]));
});

gulp.task(`build`, [`html.index`, `webpack`], function build(data, res) {
});
