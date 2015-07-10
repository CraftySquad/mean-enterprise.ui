/**
 * @module sideNav
 * @file side navigation directive
 */
angular.module('meanEnt.directive.sideNav', [
  'meanEnt.constant'
])
    .controller('SideNavCtrl', SideNavCtrl)
    .directive('meanSideNav', sideNavDef);

/**
 * @method sideNavDef
 * @description directive definition
 * @returns {{
 *  restrict: string, scope: {}, templateUrl: string,
 *  controller: string, controllerAs: string,
 *  bindToController: boolean
 * }}
 */
function sideNavDef() {
  return {
    restrict: 'E',
    scope: {
      links: '='
    },
    templateUrl: 'components/sidenav/sidenav.tpl.html',
    replace: false,
    controller: 'SideNavCtrl',
    controllerAs: 'sideNavCtrl',
    bindToController: true
  };
}

/**
 * @class SideNavCtrl
 * @constructor
 */
function SideNavCtrl() {
  'use strict';

  var vm = this;
  vm.src = null;
  vm.setSource = setSource;

  initialize();

  /**
   * @private
   * @method initialize
   * @description sets the initial source
   */
  function initialize() {
    // set initial src from first link
    var firstLink = _.first(vm.links);
    setSource(firstLink.src);
  }

  /**
   * @method setSource
   * @description set source of current link
   * @param {string} src
   *  template that contains the src for the link
   */
  function setSource(src) {
    vm.src = src;
  }
}
