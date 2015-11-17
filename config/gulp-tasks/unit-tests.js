/**
 * task: unit-tests
 */
var gulp = require('gulp');
var karma = require('karma').server;
var path = require('path');
var util = require('../util.conf.js');

/**
 * Watch for file changes and re-run tests on each change
 *  will run code-coverage report on deploy
 */
gulp.task('unit-tests', function() {
  if (util.isLocal()) {
    karma.start({
      configFile: path.normalize(__dirname + '/../karma.conf.js'),
      singleRun: !util.isLocal(),
      preprocessors: {}
    });
  }
});
