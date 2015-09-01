/**
 * @module meanEnt
 * @file app configuration
 */
angular.module('meanEnt')

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
   * <li ng-class='{ active: $state.includes('contacts.list') }'> will set the
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
 * @param {object} $mdThemingProvider
 * @param {object} $mdIconProvider
 * @param {object} environment
 * @param {object} states
 */
function configImpl($stateProvider, $urlRouterProvider, $compileProvider,
                    $httpProvider, $mdThemingProvider, $mdIconProvider,
                    environment, states) {

  $mdIconProvider
    .defaultIconSet('./assets/md-icons/avatars.svg', 128)
    .icon('angular', './assets/md-icons/angular.svg', 256)
    .icon('menu', './assets/md-icons/menu.svg', 24)
    .icon('share', './assets/md-icons/share.svg', 24)
    .icon('google_plus', './assets/md-icons/google_plus.svg', 512)
    .icon('hangouts', './assets/md-icons/hangouts.svg', 512)
    .icon('twitter', './assets/md-icons/twitter.svg', 512)
    .icon('phone', './assets/md-icons/phone.svg', 512)
    .icon('gulp', './assets/md-icons/gulp.svg', 512)
    .icon('mongo', './assets/md-icons/mongo.svg', 512)
    .icon('node', './assets/md-icons/node.svg', 512)
    .icon('express', './assets/md-icons/express.svg', 512)
    .icon('sass', './assets/md-icons/sass.svg', 512);

  var customBlueMap = $mdThemingProvider.extendPalette('light-blue', {
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50'],
    '50': 'ffffff'
  });

  $mdThemingProvider.definePalette('customBlue', customBlueMap);

  $mdThemingProvider.theme('default')
    .primaryPalette('customBlue', {
      'default': '500',
      'hue-1': '50'
    })
    .accentPalette('teal');

  /**
   * @see https://docs.angularjs.org/api/ng/provider/$compileProvider
   * Call this method to enable/disable various debug runtime information in
   *   the compiler If you wish to debug an application with this information
   *   then you should open up a debug console in the browser then call this
   *   method directly in this console: angular.reloadWithDebugInfo();
   */
  if (environment.ENV_TYPE === 'dev') {
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
  $urlRouterProvider.otherwise('/dashboard');
}

/**
 * @method appPrimeImpl
 * @description implementation details
 *  primes the application and turns off loading screen
 * @param {object} loadingService
 * @param {object} primeService
 * @param {object} $log
 */
function appPrimeImpl(loadingService, primeService, $log) {
  // show the logo during prime
  loadingService.show(true);

  primeService.primeApp()
    .then(function() {
      $log.debug('app primed');
    })
    .finally(function() {
      loadingService.hide();
    });
}
