app.factory('AuthService', function($rootScope, InstantMessageService, ProfileService) {

  'use strict';

  // intialze user object, Sinch client, user profile.
  function init() {
    FB.api('/me', function(response) {
      $rootScope.$apply(function() {
        $rootScope.user = response;
        InstantMessageService.loginSinch(response.id);
        ProfileService.init(response.id);
      });
    })
  };

  return {
    // Check the facebook login status.
    // TODO(dilu): Remove debug logging when code is well-tested.
    watchStatusChange : function() {
      FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            init();
            document.getElementById('status').innerHTML = 'Successfully logged in';
        } else if (response.status === 'not_authorized') {
          // The person is logged into Facebook, but not your app.
          document.getElementById('status').innerHTML = 'Please log ' +
            'into this app.';
        } else {
          // The person is not logged into Facebook, so we're not sure if
          // they are logged into this app or not.
          document.getElementById('status').innerHTML = 'Please log ' +
            'into Facebook.';
        }
      })
    },

    // Facebook log out
    logout : function() {
      FB.logout(function(response) {
        $rootScope.$apply(function() {
          $rootScope.user = {};
        });
      })
    }
  };
})