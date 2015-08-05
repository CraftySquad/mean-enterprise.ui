/**
 * @module app
 * @file entry point for the application
 */
angular.module('meanEnt', [
  /* angular */
  'ngAnimate',
  'ngSanitize',
  /* vendor */
  'ngMaterial',
  'ngMdIcons',
  'ui.router',
  /* app */
  'meanEnt.templates',
  'meanEnt.common',
  'meanEnt.util',
  'meanEnt.layout',
  'meanEnt.loading',
  'meanEnt.user'
]);
