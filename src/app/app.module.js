/**
 * @module app.js
 * @file entry point for the application
 */
angular.module('meanEnt', [
  /* angular */
  'ngAnimate',
  'ngSanitize',
  /* vendor */
  'ui.router',
  'angular-loading-bar',
  /* app */
  'meanEnt.templates',
  'meanEnt.constant',
  'meanEnt.config.path',
  'meanEnt.directive.header',
  'meanEnt.directive.nav',
  'meanEnt.directive.footer',
  'meanEnt.controller.landing',
  'meanEnt.controller.gettingStarted',
  'meanEnt.services.loader',
  'meanEnt.services.prime'
])

/**
 * run block
 */
  .run(runImpl)

/**
 * config block
 */
  .config(configImpl);

/**
 * @method runImpl
 * @description run implementation details
 * @param {object} $rootScope
 * @param {object} $state
 * @param {object} $stateParams
 * @param {object} $log
 */
function runImpl($rootScope, $state, $stateParams, $log) {
  /**
   * @see ui-router -
   *   https://github.com/angular-ui/ui-router/blob/master/sample/app/app.js
   *
   * It's very handy to add references to $state and $stateParams to the
   *   $rootScope so that you can access them from any scope within your
   *   applications.For example,
   * <li ng-class="{ active: $state.includes('contacts.list') }"> will set the
   *   <li> to active whenever 'contacts.list' or one of its descendants is
   *   active.
   */
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;

  /**
   * @description handle state change errors
   */
  $rootScope.$on('$stateChangeError',
    function(event, toState, toParams, fromState, fromParams, error) {
      $log.error('State Change Error - ' + error.message);
    });
}

/**
 * @method configImpl
 * @description config implementation details
 * @param {object} $stateProvider
 * @param {object} $urlRouterProvider
 * @param {object} $compileProvider
 * @param {object} $httpProvider
 * @param {object} environment
 * @param {object} states
 */
function configImpl($stateProvider, $urlRouterProvider, $compileProvider,
                    $httpProvider, environment, states) {
  /**
   * @see https://docs.angularjs.org/api/ng/provider/$compileProvider
   * Call this method to enable/disable various debug runtime information in
   *   the compiler If you wish to debug an application with this information
   *   then you should open up a debug console in the browser then call this
   *   method directly in this console: angular.reloadWithDebugInfo();
   */
  if (environment.ENV_TYPE === 'working') {
    $compileProvider.debugInfoEnabled(false);
  }

  /**
   * define abstract state
   */
  $stateProvider
    .state({
      name: states.ABSTRACT,
      abstract: true,
      views: {
        'current': {
          // loaded from current state
        }
      },
      resolve: {
        appPrime: appPrimeImpl
      }
    });

  /**
   * http setup
   */
  $httpProvider.defaults.useXDomain = true;
  //$httpProvider.interceptors.push('httpInterceptor');

  /**
   * redirect to landing page
   */
  $urlRouterProvider.otherwise('/landing');
}

/**
 * @method appPrimeImpl
 * @description implementation details
 *  primes the application and turns off splash screen
 * @param {object} loaderService
 * @param {object} primeService
 * @param {object} $log
 */
function appPrimeImpl(loaderService, primeService, $log) {
  return primeService.primeApp()
    .then(function() {
      loaderService.setPriming(false);
      $log.debug('app primed');
    });
}
