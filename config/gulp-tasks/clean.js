/**
 * task: clean
 */
var gulp = require('gulp');
var del = require('del');
var buildConfig = require('../build.conf.js');

/**
 * clean the root build directory
 * pass callback to ensure task finishes before exiting
 */
gulp.task('clean', function(cb) {
  del([buildConfig.dir.build],
    {
      force: true
    },
    cb);
});
