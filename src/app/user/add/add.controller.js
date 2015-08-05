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
  // user model
  self.user = {};

  // expose functions
  self.cancel = cancel;
  self.save = save;

  /**
   * @method cancel
   * @description cancel the dialog
   */
  function cancel() {
    $mdDialog.cancel(self.user);
  }

  /**
   * @method save
   * @description save a user
   *  simply adds to the user array for demo purposes
   */
  function save() {
    userService.add(self.user);
    $mdDialog.hide();
  }
}
