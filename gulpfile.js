/**
 * Gulp build system for Angular 1.x app
 *
 *  gulp
 *    build for local environment
 *
 *  gulp --env deploy
 *    run deploy build
 *
 *  gulp bump
 *    bump current version
 *
 *  gulp code-coverage
 *    run code coverage report and exit
 *
 *  gulp --env [dev|deploy|etc]
 *    build for specific environment
 *
 *  additional args
 *
 *  --watch
 *    file watch on deploy build
 */
var gulp = require('gulp');
var buildConfig = require('./config/build.conf.js');
var pkg = require('./package.json');
var util = require('./config/util.conf.js');
var runSequence = require('run-sequence');

// init gulp
init();

/**
 * task: default
 *  build the application, watch for changes
 */
gulp.task('default', ['clean', 'config-module'], function() {
  runSequence(
    ['app-js', 'vendor-js', 'app-css', 'copy-assets', 'svg-store'],
    ['inject-index', 'unit-tests', 'code-coverage'],
    ['file-watch', 'serve'],
    ['open-browser']
  );
});

/**
 * task: file-watch
 *  watch src files for changes and run appropriate tasks
 */
gulp.task('file-watch', function() {
  // only watch for file changes on local builds
  if (util.isLocal()) {
    util.log('watching for file changes...');
    // on sass change
    gulp.watch('src/app/**/*.scss', ['app-css']);
    // on module js change
    gulp.watch(buildConfig.app.modules, ['app-js']);
    // on app js change
    gulp.watch(buildConfig.app.js, ['app-js']);
    // on template change
    gulp.watch(buildConfig.app.tpl, ['app-js']);
    // on index change
    gulp.watch(buildConfig.app.html, ['inject-index']);
    // on static HTML change
    gulp.watch(buildConfig.app.staticHtml, ['copy-assets']);
    // on SVG change
    gulp.watch(buildConfig.app.svg, ['svg-store']);
  } else {
    util.log('skipping file watch');
  }
});

/**
 * initialize gulp
 */
function init() {
  util.log('building ' + pkg.name + ' - version ' + pkg.version);

  // load gulp tasks
  require('require-dir')('./config/gulp-tasks');
}
