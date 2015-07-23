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
 * @param {function} $http
 * @param {function} $timeout
 */
function primeServiceImpl($q, $http, $timeout) {
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
    // remove mock delay
    var defer = $q.defer();
    $timeout(function() {
      return defer.resolve(true);
    }, 1500);
    return defer.promise;

    // todo: build requests here
    //var promises = [
    //  $http({method: 'GET', url: '', params: {pOne: 'value'}}),
    //  $http({method: 'GET', url: '', params: {pTwo: 'value'}})
    //];
    //
    //return $q.all(promises)
    //  .then(function(response) {
    //    // return collection of data
    //    return response;
    //  })
    //  .catch(function(err) {
    //    return err;
    //  });
  }

  //function anotherPrimeExample(someArray) {
  //  var promises = someArray.map(function(item) {
  //    return $http({
  //      method: 'GET',
  //      url: item.url,
  //      params: {}
  //    });
  //  });
  //
  //  return $q.all(promises);
  //}
}
