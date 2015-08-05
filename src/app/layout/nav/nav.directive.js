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
 * @param {object} $state
 * @param {object} userService
 * @param {object} states
 */
function NavCtrl($mdSidenav, $mdBottomSheet, $mdDialog, $q, $state, userService,
                 states) {
  'use strict';

  var self = this;
  self.states = states;
  self.users = [];

  // expose methods
  self.signIn = signIn;
  self.selectUser = selectUser;
  self.toggleList = toggleList;

  // initialize controller
  initialize();

  /**
   * @method initialize
   * @description init the controller
   */
  function initialize() {
    userService.loadAllUsers()
      .then(function(users) {
        self.users = users;
        self.selectUser(users[0]);
      });
  }

  /**
   * @method selectUser
   * @description when a user is selected
   * @param {object} user
   */
  function selectUser(user) {
    userService.setSelectedUser(user);

    $state.go(states.USER);

    toggleList();
  }

  /**
   * @method toggleList
   * @description hide the bottomSheet, toggle sideNav
   */
  function toggleList() {
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
