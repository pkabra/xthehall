var app = angular.module('XtheHall', [
  'ngRoute',
  'parse-angular',
  'parse-angular.enhance',
]).config(function ( $routeProvider ) {
  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'HomeController',
      controllerAs: 'home'
    })
    .when('/profile_settings', {
      templateUrl: 'views/profile_settings.html',
      controller: 'ProfileSettingsController',
      controllerAs: 'profile_settings'
    })
    .when('/chat', {
      templateUrl: 'views/chat.html',
      controller: 'ChatController',
      controllerAs: 'chat',
      resolve: {
        authenticate: function($q, AuthService) {
          var deferred = $q.defer();
          AuthService.watchStatusChange(deferred);
          return deferred.promise;
        }
      }
    })
    .when('/login', {
      templateUrl: 'views/login.html'
    })
    .otherwise({
      redirectTo: '/home'
    });
}).run(function($rootScope, $q, $window, $location, AuthService) {
  $rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
    console.log(event, current, previous, rejection);
    if (rejection == "login_failed") {
      console.log("login failed");
      $location.path("/login");
    }
  })

  // create a user variable which is accessable from root scope
  $rootScope.user = {};

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  $window.fbAsyncInit = function() {
    FB.init({
      appId: '1559290244313333',
      cookie: true,  // enable cookies to allow the server to access 
      xfbml: true,  // parse social plugins on this page
      version: 'v2.1' // use version 2.1
    });
    AuthService.watchStatusChange($q.defer());
  }

  // initialize the parse 
  Parse.initialize("OBaEpcoBmjrtCpLUDLF8DxjsLaqd581mWrUMvhe2", "GNyr0W0eom463gV2vkjr2NhH10Zu7iR1grK55b3d");
});