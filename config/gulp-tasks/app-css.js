/**
 * task: app-css
 */
var gulp = require('gulp');
var merge = require('gulp-merge');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var buildConfig = require('../build.conf.js');
var options = require('../options.conf.js');
var util = require('../util.conf.js');

/**
 * generate the app's css from sass
 */
gulp.task('app-css', function() {
  util.log('generating the app\'s CSS from the SCSS');

  var filePrefix = options.filePrefix;

  var sassError = function(err) {
    util.onError('Error compiling sass:' + JSON.stringify(err));
  };

  return merge(
    gulp.src(buildConfig.vendor.css),
    gulp.src(buildConfig.app.sass)
      .pipe(sass({
        onError: sassError,
        outputStyle: 'compressed'
      }))
  )
    .pipe(concat(filePrefix + '.min.css'))
    .pipe(minifyCss({keepSpecialComments: 0}))
    .pipe(gulp.dest(buildConfig.dir.build + '/assets/css'));
});
