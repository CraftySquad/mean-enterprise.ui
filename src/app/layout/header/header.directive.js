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
 */
function HeaderCtrl() {
  'use strict';
}
