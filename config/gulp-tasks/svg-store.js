/**
 * task: svg-store
 */
var gulp = require('gulp');
var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
var rename = require('gulp-rename');
var buildConfig = require('../build.conf.js');
var util = require('../util.conf.js');

/**
 * compile the SVG files into a master SVG
 */
gulp.task('svg-store', function() {
  util.log('compressing and combining SVGs');

  return gulp.src(buildConfig.app.svg)
    .pipe(svgmin())
    .pipe(svgstore())
    .pipe(rename('svg.svg'))
    .pipe(gulp.dest(buildConfig.dir.build + '/assets/images'));
});
