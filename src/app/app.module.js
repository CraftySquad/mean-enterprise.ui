/**
 * @module app
 * @file define the app module
 */
angular.module('meanEnt', [
  /* angular */
  'ngAnimate',
  'ngSanitize',
  /* vendor */
  'ngMaterial',
  'ngMdIcons',
  'ui.router',
  'js-data',
  /* app */
  'meanEnt.templates',
  'meanEnt.common',
  'meanEnt.util',
  'meanEnt.layout',
  'meanEnt.loading',
  'meanEnt.user',
  'meanEnt.dash'
]);
