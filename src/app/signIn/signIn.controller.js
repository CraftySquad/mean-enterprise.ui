/**
 * @module signIn
 * @file controller for sign in modal
 */
angular.module('meanEnt.controller.signIn', [
  'meanEnt.models.user',
  'meanEnt.services.notify',
  'meanEnt.services.signIn'
])
  .controller('SignIn', SignIn);

/**
 * @class SignIn
 * @constructor
 * @param {object} notifyService
 * @param {function} User
 * @param {object} signInService
 * @param {object} $modalInstance
 */
function SignIn(notifyService, User, signInService, $modalInstance) {
  'use strict';

  var vm = this;
  vm.state = 'signIn';
  vm.user = new User();
  vm.cancel = cancel;
  vm.setState = setState;
  vm.signIn = signIn;
  vm.signUp = signUp;

  /**
   * @method cancel
   * @description cancels operation / closes modal
   */
  function cancel() {
    $modalInstance.close();
  }

  /**
   * @method setState
   * @description set the modal state
   * @param {string} state
   */
  function setState(state) {
    vm.state = state;
  }

  /**
   * @method signIn
   * @description signs in a user
   * @returns {*}
   */
  function signIn() {
    return signInService.signIn(vm.user)
      .then(function(response) {
        var msg = response.username + ' signed in!';
        notifyService.create(msg, 'success', {dismissButton: true});
      });
  }

  /**
   * @method signUp
   * @description creates account / sign in
   * @returns {*}
   */
  function signUp() {
    return signInService.signUp(vm.user)
      .then(function(response) {
        var msg = response.username + ' signed up!';
        notifyService.create(msg, 'success', {dismissButton: true});
      });
  }
}
