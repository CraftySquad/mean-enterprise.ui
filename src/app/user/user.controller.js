/**
 * @module UserCtrl
 * @file controller for the user view
 */
angular.module('meanEnt.user')
  .config(userConfigImpl)
  .controller('UserCtrl', UserCtrl);

/**
 * @method userConfigImpl
 * @description config implementation
 * @param {object} $stateProvider
 * @param {object} states
 */
function userConfigImpl($stateProvider, states) {
  $stateProvider.state({
    name: states.USER,
    url: '/user',
    views: {
      'current@': {
        controller: 'UserCtrl as userCtrl',
        templateUrl: 'user/user.tpl.html'
      }
    },
    data: {pageTitle: 'User Details'}
  });
}

/**
 * @class UserCtrl
 * @constructor
 * @param {object} $mdBottomSheet
 * @param {object} $mdDialog
 * @param {object} $log
 * @param {object} userService
 */
function UserCtrl($mdBottomSheet, $mdDialog, $log, userService) {
  'use strict';

  var self = this;

  // expose methods
  self.showContact = showContact;
  self.showAdd = showAdd;

  /**
   * @property user
   * @description exposes the currently selected user
   */
  Object.defineProperty(self, 'user', {
    get: function() {
      return userService.getSelectedUser();
    }
  });

  /**
   * @method showContact
   * @description show the contact bottom sheet
   * @param {object} $event
   */
  function showContact($event) {
    return $mdBottomSheet.show({
      parent: angular.element(document.getElementById('content')),
      templateUrl: 'user/contact/contact.tpl.html',
      controller: 'ContactCtrl',
      controllerAs: 'contactCtrl',
      locals: {user: self.user},
      bindToController: true,
      targetEvent: $event
    }).then(onContactClose);
  }

  /**
   * @method showAdd
   * @description show the add user dialog
   * @param {object} ev
   */
  function showAdd(ev) {
    $mdDialog.show({
      controller: 'AddCtrl as addCtrl',
      templateUrl: 'user/add/add.tpl.html',
      targetEvent: ev
    }).then(onDialogClose)
      .catch(onDialogCancel);
  }

  /**
   * @method onDialogClose
   * @description dialog close callback
   * @param {string} message
   */
  function onDialogClose(message) {
    console.log('dialog hidden ', message);
  }

  /**
   * @method onDialogCancel
   * @description dialog cancel callback
   */
  function onDialogCancel() {
    console.log('dialog cancelled');
  }

  /**
   * @method onContactClose
   * @description bottomSheet close callback
   * @param {object} clickedItem
   */
  function onContactClose(clickedItem) {
    if (clickedItem) {
      $log.debug(clickedItem.name + ' clicked!');
    }
  }
}
