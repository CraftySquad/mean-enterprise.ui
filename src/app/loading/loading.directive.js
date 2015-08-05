/**
 * @module meanLoading
 * @file directive to display a loading screen
 */
angular.module('meanEnt.loading')
  .controller('LoadingCtrl', LoadingCtrl)
  .directive('meanLoading', loadingDef);

/**
 * @method loadingDef
 * @description directive definition
 * @returns {{
 *  restrict: string, scope: {}, templateUrl: string,
 *  replace: boolean, controller: string, controllerAs: string,
 *  bindToController: boolean
 * }}
 */
function loadingDef() {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'loading/loading.tpl.html',
    replace: true,
    controller: 'LoadingCtrl',
    controllerAs: 'loadingCtrl',
    bindToController: true
  };
}

/**
 * @class LoadingCtrl
 * @constructor
 * @param {function} $mdMedia
 * @param {object} loadingService
 */
function LoadingCtrl($mdMedia, loadingService) {
  'use strict';

  var self = this;

  /**
   * @property largeScreen
   * @description true if screen is larger
   */
  Object.defineProperty(self, 'larger', {
    get: function() {
      return $mdMedia('gt-sm');
    }
  });

  /**
   * @property loading
   * @description toggles the loading view
   */
  Object.defineProperty(self, 'loading', {
    get: function() {
      return loadingService.loading();
    }
  });
}
