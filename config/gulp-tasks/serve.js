/**
 * task: serve
 */
var gulp = require('gulp');
var liveServer = require('gulp-live-server');
var buildConfig = require('../build.conf.js');
var util = require('../util.conf.js');

/**
 * local server to return mock json
 *  start node server based on environment
 */
gulp.task('serve', function() {
  if (!util.isLocal()) {
    util.log('skipping local node server');
  } else {
    var server = liveServer.new('./config/server.js');
    server.start();

    // watch for changes
    gulp.watch(['./' + buildConfig.dir.build + '/**/*.*'], function() {
      server.notify.apply(server, arguments);
    });
  }
});
