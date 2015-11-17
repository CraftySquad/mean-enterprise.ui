/**
 * task: inject-index
 */
var gulp = require('gulp');
var inject = require('gulp-inject');
var _ = require('lodash');
var buildConfig = require('../build.conf.js');
var options = require('../options.conf.js');
var util = require('../util.conf.js');

/**
 * inject js and css into index
 */
gulp.task('inject-index', function() {
  var buildDir = buildConfig.dir.build;
  // inject options
  var injectOptions = {
    ignorePath: '/' + buildConfig.dir.build + '/',
    addRootSlash: false
  };

  // get modules to inject first
  var modules = buildDir + '/src/**/*.module.js';

  // determine which file(s) to inject
  var appGlob = util.isLocal() ? 'src/**/*.js' : options.filePrefix + '.min.js';
  var app = buildDir + '/' + appGlob;
  var vendor = buildDir + '/' + options.filePrefix + '.vendor.min.js';
  var css = buildDir + '/assets/css/' + options.filePrefix + '.min.css';

  // vendor stream
  var vendorStream = gulp.src(vendor, {read: false});
  // app stream - modules first
  var appStream = gulp.src([modules, app], {read: false});
  // css stream
  var cssStream = gulp.src(css, {read: false});

  return gulp.src(buildConfig.app.html)
    // inject vendor js at custom location
    .pipe(inject(vendorStream, _.assign(_.clone(injectOptions), {'name': 'vendor'})))
    // inject app js
    .pipe(inject(appStream, injectOptions))
    // inject css
    .pipe(inject(cssStream, injectOptions))
    .pipe(gulp.dest(buildConfig.dir.build));
});
