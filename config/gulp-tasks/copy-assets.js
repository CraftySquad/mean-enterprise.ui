/**
 * task: copy-assets
 */
var gulp = require('gulp');
var series = require('stream-series');
var buildConfig = require('../build.conf.js');

/**
 * copy assets to correct output dir
 */
gulp.task('copy-assets', function() {
  return series(
    // copy app images
    gulp.src(buildConfig.app.images)
      .pipe(gulp.dest(buildConfig.dir.build + '/assets/images')),

    // copy vendor fonts
    gulp.src(buildConfig.vendor.fonts)
      .pipe(gulp.dest(buildConfig.dir.build + '/assets/fonts')),

    // copy material design svg icons
    gulp.src(buildConfig.app.mdIcons)
      .pipe(gulp.dest(buildConfig.dir.build + '/assets/md-icons')),

    // copy static html from designers
    gulp.src(buildConfig.app.staticHtml)
      .pipe(gulp.dest(buildConfig.dir.build))
  )
});
