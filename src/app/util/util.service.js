/**
 * @module utilService
 * @file utility functions
 */
angular.module('meanEnt.services.util', [])
  .service('utilService', utilServiceImpl);

/**
 * @method utilServiceImpl
 * @description service implementation
 */
function utilServiceImpl($timeout, $q) {
  'use strict';

  /**
   * @description service contract
   */
  return {
    mockAsync: mockAsync,
    mapProperties: mapProperties,
    mapProperty: mapProperty,
    mapCollection: mapCollection
  };

  /**
   * @method mockAsync
   * @description burner method for demo only
   */
  function mockAsync(delay) {
    var defer = $q.defer();

    $timeout(function() {
      defer.resolve(true);
    }, delay || 2000);

    return defer.promise;
  }

  /**
   * @method mapProperties
   * @description maps server object to model
   *  use with .call()
   * @param {object} dto
   */
  function mapProperties(dto) {
    for (var prop in dto) {
      if (dto.hasOwnProperty(prop) && this.hasOwnProperty(prop)) {
        this[prop] = dto[prop];
      }
    }
  }

  /**
   * @method mapProperty
   * @description maps a complex property
   *  use with .call()
   * @param {object} property
   * @param {function} Model
   */
  function mapProperty(property, Model) {
    if (this.hasOwnProperty(property) && angular.isFunction(Model)) {
      this[property] = new Model(this[property]);
    }
  }

  /**
   * @method mapCollection
   * @description maps a collection of complex properties
   *  use with .call()
   * @param {Array} property
   * @param {function} Model
   */
  function mapCollection(property, Model) {
    if (this.hasOwnProperty(property) && angular.isFunction(Model) &&
        angular.isArray(this[property])) {
      this[property] = this[property].map(function(item) {
        return new Model(item);
      });
    }
  }
}
