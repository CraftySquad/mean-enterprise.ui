/**
 * @module *.directive.nav
 * @file directive for the apps navigation
 */
angular.module('meanEnt.directive.nav', [
  'meanEnt.controller.signIn',
  'meanEnt.constant',
  'ui.router',
  'mm.foundation'
])
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
    replace: false,
    controller: 'NavCtrl',
    controllerAs: 'navCtrl',
    bindToController: true
  };
}

/**
 * @class NavCtrl
 * @constructor
 * @param {object} states
 * @param {object} $modal
 */
function NavCtrl(states, $modal) {
  'use strict';

  var vm = this;
  vm.states = states;
  vm.signIn = signIn;
  vm.toggleMobileNav = toggleMobileNav;

  /**
   * @method signIn
   * @description open the signIn/signUp modal
   */
  function signIn() {
    $modal.open({
      templateUrl: 'signIn/signIn.tpl.html',
      controller: 'SignIn as signIn'
    })
        .result.then(function() {
          console.log('Modal closed at: ' + new Date());
        }, function() {
          console.log('Modal dismissed at: ' + new Date());
        });
  }

  // todo: we need this?
  function toggleMobileNav() {
    vm.mobileActive = !vm.mobileActive;
  }
}
