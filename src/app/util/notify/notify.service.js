/**
 * @file exposes functions to notify the user
 */
angular.module('meanEnt.services.notify', [
  'toastr'
])
  .service('notifyService', notifyServiceImpl);

/**
 * @method notifyServiceImpl
 * @description service implementation
 * @param {object} toastr
 */
function notifyServiceImpl(toastr) {
  'use strict';

  /**
   * @description service contract
   */
  return {
    success: success,
    error: error
  };

  /**
   * @method success
   * @description alerts user of success
   * @param {string} msg
   * @param {string} title
   */
  function success(msg, title) {
    toastr.success(msg, title);
  }

  /**
   * @method error
   * @description alerts user of error
   * @param {string} msg
   * @param {string} title
   */
  function error(msg, title) {
    toastr.error(msg, title);
  }

  /**
   * @private
   * @method addOverrides
   * @description adds overrides to alert
   * @param {object} toastr
   * @param {object} overrides
   * @returns {*}
   */
  function addOverrides(toastr, overrides) {
    if (angular.isObject(overrides)) {
      for (var prop in overrides) {
        if (overrides.hasOwnProperty(prop)) {
          toastr[prop] = overrides[prop];
        }
      }
    }
    return toastr;
  }
}
