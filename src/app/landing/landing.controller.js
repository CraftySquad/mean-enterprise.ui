/**
 * @module landing
 * @file controller for the landing page
 */
angular.module('meanEnt.controller.landing', [])
    .config(landingConfigImpl)
    .controller('LandingCtrl', LandingCtrl);

/**
 * @method landingConfigImpl
 * @description config implementation
 * @param {object} $stateProvider
 * @param {object} states
 */
function landingConfigImpl($stateProvider, states) {
  $stateProvider.state({
    name: states.LANDING,
    url: '/landing',
    views: {
      'current@': {
        controller: 'LandingCtrl as landingCtrl',
        templateUrl: 'landing/landing.tpl.html'
      }
    },
    data: {pageTitle: 'Landing'}
  });
}

/**
 * @class LandingCtrl
 * @constructor
 */
function LandingCtrl() {
  'use strict';
}
