/**
 * task: code-coverage
 */
var gulp = require('gulp');
var karma = require('karma').server;
var path = require('path');
var util = require('../util.conf.js');

/**
 * run karma coverage report and exit
 */
gulp.task('code-coverage', function() {
  if (!util.isLocal()) {
    karma.start({
      configFile: path.normalize(__dirname + '/../karma.conf.js'),
      singleRun: true
    });
  }
});
