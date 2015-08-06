/**
 * @module AddCtrl
 * @file controller for the add user dialog view
 */
angular.module('meanEnt.user')
  .controller('AddCtrl', AddCtrl);

/**
 * @class AddCtrl
 * @constructor
 * @param {object} $mdDialog
 * @param {object} userService
 */
function AddCtrl($mdDialog, userService) {
  'use strict';

  var self = this;
  self.user = {};

  // expose functions
  self.cancel = cancel;
  self.save = save;

  /**
   * @method cancel
   * @description cancel the dialog
   */
  function cancel() {
    $mdDialog.cancel();
  }

  /**
   * @method save
   * @description mock save a user
   * @param {object} user
   */
  function save(user) {
    userService.add(user);
    $mdDialog.hide(new Date().toUTCString());
  }
}
