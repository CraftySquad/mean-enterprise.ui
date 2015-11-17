/**
 * task: jscs
 */
var gulp = require('gulp');
var jscs = require('gulp-jscs');
var buildConfig = require('../build.conf.js');

/**
 * checks code against chosen style guide - currently using google code guide
 * other options located @
 *  /Web.UI/node_modules/gulp-jscs/node_modules/jscs/presets
 */
gulp.task('jscs', function() {
  return gulp.src(buildConfig.app.js)
    .pipe(jscs('./config/.jscsrc'));
});
