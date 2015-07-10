/**
 * @module loaderService
 * @file exposes functions to toggle the loading screens
 */
angular.module('meanEnt.services.loader', [])
  .service('loaderService', loaderServiceImpl);

/**
 * @method loaderServiceImpl
 * @description service implementation
 */
function loaderServiceImpl() {
  'use strict';

  /**
   * @private
   * @property _appLoading - toggles the loading screen
   * @property _priming - toggles the splash screen
   */
  var _appLoading = false;
  var _priming = true;

  /**
   * @description service contract
   */
  return {
    appLoading: appLoading,
    priming: priming,
    setAppLoading: setAppLoading,
    setPriming: setPriming
  };

  /**
   * @method appLoading
   * @description gets the app loading value
   * @returns: {bool}
   */
  function appLoading() {
    return _appLoading;
  }

  /**
   * @method priming
   * @description gets the show priming value
   * @returns: {bool}
   */
  function priming() {
    return _priming;
  }

  /**
   * @method setAppLoading
   * @description sets the app loading value
   * @param {boolean} newValue
   *  value to set
   */
  function setAppLoading(newValue) {
    _appLoading = newValue;
  }

  /**
   * @method setPriming
   * @description sets the show priming value
   * @param {boolean} newValue
   *  value to set
   */
  function setPriming(newValue) {
    _priming = newValue;
  }
}
