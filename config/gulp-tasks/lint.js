/**
 * task: lint
 */
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var buildConfig = require('../build.conf.js');

/**
 * using jshint to lint files
 */
gulp.task('lint', function() {
  return gulp.src(buildConfig.app.js)
    .pipe(jshint('./config/.jshintrc'))
    .pipe(jshint.reporter('default'));
});
