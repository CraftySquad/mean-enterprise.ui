/**
 * @module primeService
 * @file get data to prime the application
 */
angular.module('meanEnt.services.prime', [])
  .service('primeService', primeServiceImpl);

/**
 * @method primeServiceImpl
 * @description service implementation
 * @param {object} $q
 */
function primeServiceImpl($q, $timeout) {
  'use strict';

  /**
   * @description service contract
   */
  return {
    primeApp: primeApp
  };

  /**
   * @method primeApp
   * @description fetch required data for the app
   * @returns {promise}
   */
  function primeApp() {
    // todo: remove mock delay
    var defer = $q.defer();
    $timeout(function() {
      return defer.resolve(true);
    }, 1500);
    return defer.promise;

    // todo: build requests here
    //var requests = [
    //  {method: 'GET', url: '', params: {}},
    //  {method: 'GET', url: '', params: {}}
    //];
    //
    //return $q.all(requests)
    //  .then(function(response) {
    //    // return collection of data
    //    return response;
    //  })
    //  .catch(function(err) {
    //    return err;
    //  });
  }
}
