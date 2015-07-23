/**
 * @module signIn
 * @file controller for sign in modal
 */
angular.module('meanEnt.controller.signIn', [
  'meanEnt.services.notify',
  'meanEnt.services.signIn'
])
  .controller('SignIn', SignIn);

/**
 * @class SignIn
 * @constructor
 * @param {object} notifyService
 * @param {object} signInService
 * @param {object} $modalInstance
 */
function SignIn(notifyService, signInService, $modalInstance) {
  'use strict';

  var vm = this;
  vm.state = 'signIn';
  vm.user = {};

  /**
   * @method cancel
   * @description cancels operation / closes modal
   */
  vm.cancel = function() {
    $modalInstance.close();
  };

  /**
   * @method setState
   * @description set the modal state
   * @param {string} state
   */
  vm.setState = function(state) {
    vm.state = state;
  };

  /**
   * @method signIn
   * @description signs in a user
   * @returns {*}
   */
  vm.signIn = function() {
    return signInService.signIn(vm.user)
      .then(function(response) {
        var msg = response.username + ' signed in!';
        notifyService.create(msg, 'success', {dismissButton: true});
      });
  };

  /**
   * @method signUp
   * @description creates account / sign in
   * @returns {*}
   */
  vm.signUp = function() {
    return signInService.signUp(vm.user)
      .then(function(response) {
        var msg = response.username + ' signed up!';
        notifyService.create(msg, 'success', {dismissButton: true});
      });
  };
}
