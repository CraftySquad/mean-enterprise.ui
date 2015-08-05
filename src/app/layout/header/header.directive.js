/**
 * @module meanHeader
 * @file header directive
 */
angular.module('meanEnt.layout')
  .directive('meanHeader', headerDef)
  .controller('HeaderCtrl', HeaderCtrl);

/**
 * @method headerDef
 * @description directive definition
 */
function headerDef() {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'layout/header/header.tpl.html',
    controller: 'HeaderCtrl',
    controllerAs: 'headerCtrl',
    bindToController: true
  };
}

/**
 * @class HeaderCtrl
 * @constructor
 * @param {object} $mdBottomSheet
 * @param {function} $mdSidenav
 * @param {object} $q
 * @param {object} $state
 */
function HeaderCtrl($mdBottomSheet, $mdSidenav, $q, $state) {
  'use strict';

  var self = this;
  self.$state = $state;

  // expose methods
  self.toggleSideNav = toggleSideNav;

  /**
   * @method toggleSideNav
   * @description hide the bottomSheet if visible, then
   *  toggle the left sideNav
   */
  function toggleSideNav() {
    var pending = $mdBottomSheet.hide() || $q.when(true);

    pending.then(function() {
      $mdSidenav('left').toggle();
    });
  }
}
