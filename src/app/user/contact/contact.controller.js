/**
 * @module ContactCtrl
 * @file controller for the contact bottom sheet
 */
angular.module('meanEnt.user')
  .controller('ContactCtrl', ContactCtrl);

/**
 * @method ContactCtrl
 * @constructor
 * @param {object} $mdBottomSheet
 * @param {object} $mdToast
 * @param {object} user
 *  currently selected user
 */
function ContactCtrl($mdBottomSheet, $mdToast, user) {
  'use strict';

  var self = this;
  self.user = user;

  // available actions
  self.actions = [
    {
      name: 'Phone',
      icon: 'phone',
      iconUrl: 'assets/md-icons/phone.svg'
    },
    {
      name: 'Twitter',
      icon: 'twitter',
      iconUrl: 'assets/md-icons/twitter.svg'
    },
    {
      name: 'Google+',
      icon: 'google_plus',
      iconUrl: 'assets/md-icons/google_plus.svg'
    },
    {
      name: 'Hangout',
      icon: 'hangouts',
      iconUrl: 'assets/md-icons/hangouts.svg'
    }
  ];

  /**
   * @method submitContact
   * @description hide the bottomSheet on button click
   */
  self.submitContact = function(action) {
    // show simple toast
    $mdToast.show(
      $mdToast.simple()
        .content(action.name + ' clicked!')
        .position('top right')
    );

    $mdBottomSheet.hide(action);
  };
}
