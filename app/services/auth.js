app.factory('AuthService', function($rootScope, $location, InstantMessageService, ProfileService) {

  'use strict';

  // intialze user object, Sinch client, user profile.
  function init(d) {
    FB.api('/me', function(response) {
      $rootScope.$apply(function() {
        $rootScope.user = response;
        InstantMessageService.loginSinch(response.id);
        ProfileService.init(response.id);
        if (!angular.isUndefined(d))
          d.resolve();
      });
    })
  };

  return {
    // Check the facebook login status.
    // TODO(dilu): Remove debug logging when code is well-tested.
    watchStatusChange : function(d) {
      FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            init(d);
        } else {
          // The person is not logged into Facebook, so we're not sure if
          // they are logged into this app or not.
          if (!angular.isUndefined(d)) {
            d.reject("login_failed");
          }
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