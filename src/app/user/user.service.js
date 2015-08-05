/**
 * @module userService
 * @file user related operations
 */
angular.module('meanEnt.user')
  .service('userService', userServiceImpl);

function userServiceImpl($http) {

  'use strict';

  var _selectedUser = null;
  var _users = [];

  return {
    add: add,
    getSelectedUser: getSelectedUser,
    setSelectedUser: setSelectedUser,
    loadAllUsers: loadAllUsers
  };

  function loadAllUsers() {
    var request = {
      method: 'GET',
      url: '/users'
    };

    return $http(request)
      .then(function(response) {
        var _users = response.data;
        return _users;
      });
  }

  function add(user) {
    _users.push(user);
  }

  function setSelectedUser(user) {
    _selectedUser = user;
  }

  function getSelectedUser() {
    return _selectedUser;
  }
}
