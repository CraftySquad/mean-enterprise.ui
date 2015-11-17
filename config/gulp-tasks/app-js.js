/**
 * task: app-js
 */
var gulp = require('gulp');
var merge = require('gulp-merge');
var concat = require('gulp-concat');
var html2js = require('gulp-html2js');
var ngAnnotate = require('gulp-ng-annotate');
var size = require('gulp-size');
var wrap = require('gulp-wrap');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var stripDebug = require('gulp-strip-debug');
var buildConfig = require('../build.conf.js');
var options = require('../options.conf.js');
var util = require('../util.conf.js');

/**
 * concat, ngAnnotate, uglify application files
 * wraps uglified output in IIFE
 * converts *.tpl.html files to injectable js modules
 */
gulp.task('app-js', ['lint', 'jscs'], function() {
  // are we running local
  var isLocal = util.isLocal();
  // get options
  var appModuleName = options.appModuleName;
  var filePrefix = options.filePrefix;

  return merge(
    gulp.src(buildConfig.app.modules),
    gulp.src(buildConfig.app.js),
    gulp.src(buildConfig.app.tpl)
      .pipe(html2js({
        base: 'src/app',
        outputModuleName: appModuleName + '.templates',
        useStrict: true
      }))
      .pipe(concat(filePrefix + '.templates.js'))
      .pipe(size({
        title: appModuleName + '.templates'
      }))
  )
    // concat
    .pipe(gulpif(!isLocal, concat(filePrefix + '.js')))
    // ng-annotate
    .pipe(gulpif(!isLocal, ngAnnotate()))
    // wrap output in IIFE
    .pipe(gulpif(!isLocal,
      wrap('(function(){\n\'use strict\';\n<%= contents %>\n})();')))
    // output a non-minified version
    .pipe(gulpif(!isLocal, gulp.dest(buildConfig.dir.build)))
    // strip console, alert, debugger
    .pipe(stripDebug())
    // uglify
    .pipe(gulpif(!isLocal,
      uglify({mangle: false, output: {preamble: opts.banner}})))
    // add min extension
    .pipe(gulpif(!isLocal, rename({extname: '.min.js'})))
    // put js in src folder if working local
    .pipe(gulp.dest(
      gulpif(!isLocal, buildConfig.dir.build, buildConfig.dir.build + '/src')));
});
