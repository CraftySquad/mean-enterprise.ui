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
 * @param {object} $mdToast
 * @param {object} signInService
 */
function SignInCtrl($mdDialog, $mdToast, signInService) {
  'use strict';

  var self = this;
  self.state = 'signIn';
  self.user = {};

  // expose methods
  self.cancel = cancel;
  self.setState = setState;
  self.signIn = signIn;
  self.signUp = signUp;

  /**
   * @method cancel
   * @description cancels operation / closes modal
   */
  function cancel() {
    $mdDialog.cancel();
  }

  /**
   * @method setState
   * @description set the modal state
   * @param {string} state
   */
  function setState(state) {
    self.state = state;
  }

  /**
   * @private
   * @method showToast
   * @description displays toast on signIn/signUp
   * @param {string} message
   */
  function showToast(message) {
    $mdToast.show(
      $mdToast.simple()
        .content(message)
        .position('top right')
    );
  }

  /**
   * @method signIn
   * @description signs in a user
   * @param {object} user
   * @returns {*}
   */
  function signIn(user) {
    signInService.signIn(user)
      .then(function(response) {
        showToast('User Signed In!');
      });
  }

  /**
   * @method signUp
   * @description creates account / sign in
   * @param {object} user
   * @returns {*}
   */
  function signUp(user) {
    signInService.signUp(user)
      .then(function(response) {
        showToast(response.message);
      });
  }
}
