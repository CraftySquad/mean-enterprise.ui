/**
 * task: open-browser
 */
var gulp = require('gulp');
var open = require('gulp-open');
var buildConfig = require('../build.conf.js');
var util = require('../util.conf.js');

/**
 * open the app in a browser
 */
gulp.task('open-browser', function() {
  if (util.isLocal()) {
    var options = {
      url: 'http://localhost:' + buildConfig.serverPort,
      app: util.getBrowser()
    };

    // An actual file must be specified or gulp will overlook the task.
    return gulp.src(buildConfig.dir.build + '/index.html')
      .pipe(open('', options));
  } else {
    util.log('skipping browser');
  }
});
