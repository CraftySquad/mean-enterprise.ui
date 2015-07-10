/**
 * @module header
 * @file directive for the header template
 */
angular.module('meanEnt.directive.header', [
  'meanEnt.directive.loader',
  'meanEnt.services.notify',
  'mm.foundation'
])
    .directive('meanHeader', headerDef)
    .controller('HeaderCtrl', HeaderCtrl);

/**
 * @method headerDef
 * @description directive definition
 * @returns {{
 *  restrict: string, scope: {}, templateUrl: string,
 *  replace: boolean, controller: string, controllerAs: string,
 *  bindToController: boolean
 * }}
 */
function headerDef() {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'layout/header/header.tpl.html',
    replace: false,
    controller: 'HeaderCtrl',
    controllerAs: 'headerCtrl',
    bindToController: true
  };
}

/**
 * @class HeaderCtrl
 * @constructor
 */
function HeaderCtrl() {
  'use strict';
}
