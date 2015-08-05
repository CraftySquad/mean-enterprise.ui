/**
 * @module loadingService
 * @file exposes functions to toggle the loading screen
 */
angular.module('meanEnt.loading')
  .service('loadingService', loadingServiceImpl);

/**
 * @method loadingServiceImpl
 * @description service implementation
 */
function loadingServiceImpl() {
  'use strict';

  /**
   * @private
   * @property _loading
   *  isLoading - is the app loading screen displayed
   *  showLogo - should the logo be displayed (typically only during app priming)
   */
  var _loading = {
    isLoading: false,
    showLogo: false
  };

  /**
   * @description service contract
   */
  return {
    show: show,
    hide: hide,
    loading: loading
  };

  /**
   * @method loading
   * @description gets the loading object
   * @returns {object}
   */
  function loading() {
    return _loading;
  }

  /**
   * @method show
   * @description shows the loading screen
   * @param {bool} showLogo
   *  optionally show the logo
   */
  function show(showLogo) {
    _loading = {
      isLoading: true,
      showLogo: showLogo || false
    };
  }

  /**
   * @method hide
   * @description hides the loading screen
   */
  function hide() {
    _loading = {
      isLoading: false,
      showLogo: false
    };
  }
}
