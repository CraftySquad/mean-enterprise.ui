/**
 * task: bump
 */
var gulp = require('gulp');
var bump = require('gulp-bump');
var buildConfig = require('../build.conf.js');

/**
 * Basic usage: will patch the version in bower and package.json
 */
gulp.task('bump', function() {
  // bump bower and package.json
  return gulp.src(['./bower.json', './package.json'])
    .pipe(bump({type: 'patch'}))
    .pipe(gulp.dest('./'));
});
