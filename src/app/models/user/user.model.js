/**
 * @file User model
 */
angular.module('meanEnt.models.user', [])
  .factory('User', userImpl);

/**
 * @method userImpl
 * @description model implementation
 * @returns {Function}
 */
function userImpl(utilService) {

  /**
   * @class User
   * @constructor
   * @param {object} dto
   */
  var User = function(dto) {
    this.email = '';
    this.password = '';
    this.username = '';

    utilService.mapProperties.call(this, dto);
  };

  return User;
}
