/**
 * @file directive for loading / priming screen
 */
angular.module('meanEnt.directive.loader', [
    'meanEnt.services.loader'
])
    .controller('LoaderCtrl', LoaderCtrl)
    .directive('meanLoader', loaderDef);

/**
 * @method loaderDef
 * @description directive definition
 * @returns {{
 *  restrict: string, scope: {}, templateUrl: string,
 *  replace: boolean, controller: string, controllerAs: string,
 *  bindToController: boolean
 * }}
 */
function loaderDef() {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'loader/loader.tpl.html',
    replace: false,
    controller: 'LoaderCtrl',
    controllerAs: 'loaderCtrl',
    bindToController: true
  };
}

/**
 * @class LoaderCtrl
 * @constructor
 * @param {object} loaderService
 * @param {object} app
 */
function LoaderCtrl(loaderService, app) {
  'use strict';
  var vm = this;
  vm.loadingMessage = 'loading..';
  vm.primingMessage = app.NAME;

  /**
   * @property appLoading
   * @description toggles the loading screen
   */
  Object.defineProperty(vm,
      'appLoading', {
        get: function() {
          return loaderService.appLoading();
        }
      });

  /**
   * @property showPriming
   * @description toggles the priming screen
   */
  Object.defineProperty(vm,
      'priming', {
        get: function() {
          return loaderService.priming();
        }
      });
}
