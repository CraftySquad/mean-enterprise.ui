/**
 * task: config-module
 */
var gulp = require('gulp');
var ngConstant = require('gulp-ng-constant');
var wrap = require('gulp-wrap');
var buildConfig = require('../build.conf.js');
var optionConfig = require('../options.conf.js');
var util = require('../util.conf.js');

/**
 * builds config.module.js with correct environment info
 */
gulp.task('config-module', function() {
  return gulp.src('')
    .pipe(ngConstant({
      space: ' ',
      wrap: false,
      name: optionConfig.appModuleName + '.config',
      constants: util.getEnv(),
      dest: buildConfig.dir.path + '/config.module.js'
    }))
    .pipe(wrap('/* auto generated via gulp config-module task */\n' +
               '// jscs:disable\n/* jshint ignore:start */\n\n' +
               '<%= contents %>\n// jscs:enable\n/* jshint ignore:end */\n\n'))
    .pipe(gulp.dest(''));
});
