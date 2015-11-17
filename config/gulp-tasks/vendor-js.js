/**
 * task: vendor-js
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var buildConfig = require('../build.conf.js');
var options = require('../options.conf.js');

/**
 * concat vendor js
 */
gulp.task('vendor-js', function() {
  var filePrefix = options.filePrefix;

  return gulp.src(buildConfig.vendor.js)
    .pipe(concat(filePrefix + '.vendor.js'))
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest(buildConfig.dir.build));
});
