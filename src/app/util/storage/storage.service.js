/**
 * @module storageService
 * @file handles data persistence in localStorage
 */
angular.module('meanEnt.util')
  .service('storageService', storageServiceImpl);

/**
 * @method storageServiceImpl
 * @description service implementation
 */
function storageServiceImpl($window) {
  'use strict';

  /**
   * @description service contract
   */
  return {
    clear: clear,
    get: get,
    getObject: getObject,
    removeKey: removeKey,
    set: set
  };

  /**
   * @method clear
   * @description clears local storage
   */
  function clear() {
    $window.localStorage.clear();
  }

  /**
   * @method get
   * @description gets a simple value
   *  returns defaultValue if key does not exist
   * @param {string} key
   * @param {*} defaultValue
   * @returns {*}
   */
  function get(key, defaultValue) {
    return $window.localStorage[key] || defaultValue;
  }

  /**
   * @method getObject
   * @description gets a complex value
   * @param {string} key
   * @returns {object}
   */
  function getObject(key) {
    return JSON.parse($window.localStorage[key] || '{}');
  }

  /**
   * @method removeKey
   * @description removes a key
   * @param {string} key
   */
  function removeKey(key) {
    $window.localStorage.removeItem(key);
  }

  /**
   * @method set
   * @description adds or overwrites a key/value pair
   *  if value is an object, JSON.stringify is called
   * @param {string} key
   * @param {*} value
   */
  function set(key, value) {
    if (angular.isObject(value)) {
      $window.localStorage[key] = JSON.stringify(value);
    } else {
      $window.localStorage[key] = value;
    }
  }
}
