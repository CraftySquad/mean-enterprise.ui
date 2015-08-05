/**
 * @module SignInCtrl
 * @file controller for sign in modal
 */
angular.module('meanEnt.signIn')
  .controller('SignInCtrl', SignInCtrl);

/**
 * @class SignInCtrl
 * @constructor
 * @param {object} $mdDialog
 * @param {object} signInService
 */
function SignInCtrl($mdDialog, signInService) {
  'use strict';

  var vm = this;
  vm.state = 'signIn';
  vm.user = {};

  /**
   * @method cancel
   * @description cancels operation / closes modal
   */
  vm.cancel = function() {
    $mdDialog.cancel();
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
    signInService.signIn(vm.user)
      .then(function(response) {

      });
  };

  /**
   * @method signUp
   * @description creates account / sign in
   * @returns {*}
   */
  vm.signUp = function() {
    signInService.signUp(vm.user)
      .then(function(response) {

      });
  };
}
