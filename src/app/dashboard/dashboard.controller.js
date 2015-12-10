/**
 * @module DashCtrl
 * @file controller for the dashboard view
 */
angular.module('meanEnt.dash')
  .config(dashConfigImpl)
  .controller('DashCtrl', DashCtrl);

/**
 * @method dashConfigImpl
 * @description config implementation
 */
function dashConfigImpl($stateProvider, states) {
  $stateProvider
    .state({
      name: states.DASH,
      url: '/dashboard',
      views: {
        'current@': {
          controller: 'DashCtrl as dashCtrl',
          templateUrl: 'dashboard/dashboard.tpl.html'
        }
      },
      data: {pageTitle: 'Dashboard'}
    });
}

/**
 * @class DashCtrl
 * @constructor
 */
function DashCtrl() {
  'use strict';
  var vm = this;
  vm.message = 'This is a directive';

  vm.changeMessage = function() {
    vm.message = 'Changed from Dashboard Controller';
  };
}
