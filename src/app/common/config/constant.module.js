/**
 * @file stores constant values for the application
 * @see https://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
 *  Use NAMES_LIKE_THIS for constant values
 */

angular.module('meanEnt.constant', [])

/**
 * @constant app
 */
  .constant('app', {
    NAME: 'MEAN Enterprise'
  })

/**
 * @constant endpoints
 */
  .constant('endpoints', {
    USER_SIGN_IN: 'user/signIn',
    USER_SIGN_UP: 'user/signUp'
  })

/**
 * @constant enums
 */
  .constant('enums', {})

/**
 * @constant settings
 */
  .constant('settings', {})

/**
 * @constant states
 */
  .constant('states', {
    ABSTRACT: 'meanEnt',
    LANDING: 'meanEnt.landing',
    GETTING_STARTED: 'meanEnt.gettingStarted'
  })

/**
 * @constant strings
 */
  .constant('strings', {})

/**
 * @constant templates
 */
  .constant('templates', {});
