/**
 * @module gettingStarted
 * @file controller for gettingStarted feature
 */
angular.module('meanEnt.controller.gettingStarted', [
  'meanEnt.directive.sideNav',
  'meanEnt.services.loader',
  'meanEnt.services.notify',
  'meanEnt.services.util'
])
    .config(gettingStartedConfigImpl)
    .controller('GettingStartedCtrl', GettingStartedCtrl);

/**
 * @method gettingStartedConfigImpl
 * @description config implementation
 * @param {object} $stateProvider
 * @param {object} states
 */
function gettingStartedConfigImpl($stateProvider, states) {
  $stateProvider.state({
    name: states.GETTING_STARTED,
    url: '/gettingStarted',
    views: {
      'current@': {
        controller: 'GettingStartedCtrl as gettingStartedCtrl',
        templateUrl: 'gettingStarted/gettingStarted.tpl.html'
      }
    },
    data: {pageTitle: 'Getting Started'}
  });
}

/**
 * @class GettingStartedCtrl
 * @constructor
 * @param {function} $timeout
 * @param {object} loaderService
 * @param {object} notifyService
 * @param {object} utilService
 */
function GettingStartedCtrl($timeout, loaderService, notifyService,
                            utilService) {
  'use strict';

  var vm = this;
  vm.notifyUser = notifyUser;
  vm.showLoader = showLoader;

  /**
   * @method showLoader
   * @description shows the loader for 2 seconds
   */
  function showLoader() {
    loaderService.setAppLoading(true);

    // do async operation, turn off loader
    utilService.mockAsync(2000)
      .then(function() {
        loaderService.setAppLoading(false);
      });
  }

  /**
   * @method notifyUser
   * @description notify user example
   */
  function notifyUser() {
    notifyService.success('Successful!', '');

    $timeout(function() {
      notifyService.error('Error!', '');
    }, 750);
  }
}
