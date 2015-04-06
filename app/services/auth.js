app.factory('AuthService', function($q, $rootScope, $location, InstantMessageService, ProfileService) {

  'use strict';

  // intialze user object, Sinch client, user profile.
  function init(d, isFb) {
    if (isFb) {
      FB.api('/me', function(response) {
        $rootScope.$apply(function() {
          $rootScope.user = response;

          InstantMessageService.loginSinch(response.id);
          console.log("initializing profile service");

          ProfileService.init(response.id).then(function() {
            console.log("completed profile setup");
            if (!angular.isUndefined(d))
              d.resolve();
          });

        });
      })
    } else {
      var currentUser = Parse.User.current();
      $rootScope.user = currentUser;

      InstantMessageService.loginSinch(currentUser.id);
      console.log("initializing profile service");

      ProfileService.init(currentUser.id).then(function() {
        console.log("completed profile setup");
        if (!angular.isUndefined(d))
          d.resolve();
      });
    }
  };

  return {
    // Check the facebook login status.
    // TODO(dilu): Remove debug logging when code is well-tested.
    watchStatusChange : function(d) {
      var currentUser = Parse.User.current();

      // if the user logs in with xtheHall account
      if (currentUser) {
        init(d, false);
      } else {
        FB.getLoginStatus(function(response) {
          if (response.status === 'connected') {
              init(d, true);
          } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            if (!angular.isUndefined(d)) {
              d.reject("login_failed");
            }
          }
        });
      }
    },

    // Create a user account with user name, password, and
    // optional email
    // params:
    //     userName: user name
    //     password: password
    //     email (optional): email
    // return: a promise which is resolved on success or
    //         rejected when error occurs
    signUp : function(userName, password, email) {
      var deferred = $q.defer();

      var user = new Parse.User();
      user.set("username", userName);
      user.set("password", password);
      if (angular.isDefined(email))
          user.set("email", email);

      user.signUp(null, {
        success: function(user) {
            deferred.resolve();
        },
        error: function(user, error) {
          console.log("Error: " + error.code + " " + error.message);
          deferred.reject(error);
        }
      });

      return deferred.promise;
    },

    // Log in a user account with user name, password
    // params:
    //     userName: user name
    //     password: password
    // return: a promise which is resolved on success or
    //         rejected when error occurs
    login : function(userName, password) {
      var deferred = $q.defer();

      Parse.User.logIn(userName, password, {
        success: function(user) {
          deferred.resolve();
        },
        error: function(user, error) {
          console.log("Error: " + error.code + " " + error.message);
          deferred.reject(error);
        }
      });

      return deferred.promise;
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