/**
 * @module primeService
 * @file get data to prime the application
 */
angular.module('meanEnt.util')
  .service('primeService', primeServiceImpl);

/**
 * @method primeServiceImpl
 * @description service implementation
 * @param {object} $q
 * @param {function} $timeout
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
    // remove mock delay
    var defer = $q.defer();
    $timeout(function() {
      return defer.resolve(true);
    }, 2500);
    return defer.promise;

    // todo: example of how you might prime users
    //var promises = [
    //  $http({method: 'GET', url: '/users'})
    //];
    //
    //return $q.all(promises)
    //  .then(function(response) {
    //    // set users
    //    userService.setUsers(response[0].data);
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
