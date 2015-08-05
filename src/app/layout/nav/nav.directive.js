/**
 * @module meanNav
 * @file navigation directive
 *  being utilized as a side nav
 */
angular.module('meanEnt.layout')
  .directive('meanNav', navDef)
  .controller('NavCtrl', NavCtrl);

/**
 * @method navDef
 * @description directive definition
 * @returns {{
 *  restrict: string, templateUrl: string,
 *  replace: boolean, controller: string, controllerAs: string,
 *  bindToController: boolean
 * }}
 */
function navDef() {
  return {
    restrict: 'E',
    templateUrl: 'layout/nav/nav.tpl.html',
    replace: true,
    controller: 'NavCtrl',
    controllerAs: 'navCtrl',
    bindToController: true
  };
}

/**
 * @class NavCtrl
 * @constructor
 * @param {function} $mdSidenav
 * @param {object} $mdBottomSheet
 * @param {object} $mdDialog
 * @param {object} $q
 * @param {object} userService
 * @param {object} states
 */
function NavCtrl($mdSidenav, $mdBottomSheet, $mdDialog, $q, userService,
                 states) {
  'use strict';

  var self = this;
  self.states = states;
  self.signIn = signIn;
  self.selectUser = selectUser;
  self.toggleList = toggleUsersList;
  self.users = [];

  self.menu = [
    {
      link: '',
      title: 'Dashboard',
      icon: 'dashboard'
    },
    {
      link: '',
      title: 'Users',
      icon: 'group'
    }
  ];

  initialize();

  function initialize() {
    userService.loadAllUsers()
      .then(function(users) {
        self.users = users;
        self.selectUser(users[0]);
      });
  }

  /**
   * Select the current avatars
   */
  function selectUser(user) {
    userService.setSelectedUser(user);
    self.toggleList();
  }

  /**
   * First hide the bottomsheet IF visible, then
   * hide or Show the 'left' sideNav area
   */
  function toggleUsersList() {
    var pending = $mdBottomSheet.hide() || $q.when(true);

    pending.then(function() {
      $mdSidenav('left').toggle();
    });
  }

  /**
   * @method signIn
   * @description show the signIn/signUp dialog
   */
  function signIn(ev) {
    $mdDialog.show({
      controller: 'SignInCtrl as signInCtrl',
      templateUrl: 'signIn/signIn.tpl.html',
      targetEvent: ev
    }).then(onDialogClose)
      .catch(onDialogCancel);
  }

  /**
   * @method onDialogClose
   * @description dialog close callback
   */
  function onDialogClose() {
    console.log('dialog hidden');
  }

  /**
   * @method onDialogCancel
   * @description dialog cancel callback
   */
  function onDialogCancel() {
    console.log('dialog cancelled');
  }
}
