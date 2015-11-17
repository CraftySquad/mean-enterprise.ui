/**
 * @module util
 * @file provides utility functions
 */
var args = require('yargs').argv;
var os = require('os-utils');
var buildConfig = require('./build.conf.js');
var envConfig = require('./environments.conf.js');

// Optionally, pass in --env [deploy/staging/qa/prod] to override
var environment = process.env.NODE_ENV || args.env || 'dev';
var gLog = require('gulp-util').log;
var blue = require('gulp-util').colors.blue.bold;
var red = require('gulp-util').colors.red.bold;

module.exports = {
  getBrowser: getBrowser,
  getEnv: getEnv,
  isLocal: isLocal,
  log: log,
  onError: onError
};

// log environment
log('running ' + environment.toUpperCase() + ' build');

/**
 * @method getBrowser
 * @description return browser to use for liveReload
 */
function getBrowser() {
  if (os.platform().toLowerCase() === 'darwin') {
    return buildConfig.browser.osx;
  }
  return buildConfig.browser.windows;
}

/**
 * @method getEnv
 * @description returns the environment object
 * @returns {object}
 */
function getEnv() {
  return envConfig[environment];
}

/**
 * @method isLocal
 * @description checks if we are running a local build
 * @returns {boolean}
 */
function isLocal() {
  return (environment !== 'deploy' || args.watch);
}

/**
 * @method log
 * @description logs a build process message
 * @param {string} message
 */
function log(message) {
  gLog(blue(message));
}

/**
 * @method onError
 * @description display error
 * @param {string} err
 */
function onError(err) {
  gLog(red(err));
}