/**
 * @module utilService
 * @file utility functions
 */
angular.module('meanEnt.util')
  .service('utilService', utilServiceImpl);

/**
 * @method utilServiceImpl
 * @description service implementation
 */
function utilServiceImpl() {
  'use strict';

  /**
   * @description service contract
   */
  return {
    mapProperties: mapProperties,
    mapProperty: mapProperty,
    mapCollection: mapCollection
  };

  /**
   * @method mapProperties
   * @description maps server object to model
   *  set the 'this' argument when calling this function
   *  forEach does not iterate over inherited properties,
   *  it filters using the hasOwnProperty method
   * @param {object} dto
   */
  function mapProperties(dto) {
    var self = this;

    angular.forEach(dto, function(value, key) {
      self[key] = value;
    });
  }

  /**
   * @method mapProperty
   * @description maps a complex property
   *  set the 'this' argument when calling this function
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
   *  set the 'this' argument when calling this function
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
