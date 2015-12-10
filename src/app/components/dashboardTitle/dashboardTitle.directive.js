/**
 * This directive will dynamically render a component for the dashboard
 * @module *.directive.dashboardTitle
 * @file Component Wrapper Directive
 */
angular.module('meanEnt.components')
  .directive('dashboardTitle', dashboardTitleImpl)
  .controller('DashboardTitle', DashboardTitle);

/**
 * @method dashboardTitleImpl
 * @description implementation details
 * @returns {{
 *  restrict: string, scope: {}, templateUrl: string,
 *  controller: string, controllerAs: string,
 *  bindToController: boolean
 * }}
 */
function dashboardTitleImpl() {
  return {
    restrict: 'E',
    scope: {
      message: '='
    },
    templateUrl: 'components/dashboardTitle/dashboardTitle.tpl.html',
    replace: true,
    controller: 'DashboardTitle',
    controllerAs: 'dashboardTitle',
    bindToController: true
  };
}

function DashboardTitle() {
  'use strict';
  var vm = this;

  vm.changeMessage = function() {
    vm.message = 'Changed from dashboard-title';
  };
}
