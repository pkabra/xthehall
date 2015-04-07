var Authenticator = function($rootScope, $q, AuthService) {
  if (!_.isEmpty($rootScope.user)) return;
  var deferred = $q.defer();
  AuthService.watchStatusChange(deferred);
  return deferred.promise;
}

var RoomSetup = function ($route, $q, HistoryService) {
  var deferred = $q.defer();
  HistoryService.retrieveRoom($route.current.params.chatid, deferred);
  return deferred.promise;
}

var app = angular.module('XtheHall', [
  'ngRoute',
  'parse-angular',
  'parse-angular.enhance',
  'ui.bootstrap',
  'ngTagsInput'
]).config(function ( $routeProvider ) {
  $routeProvider
    .when('/profile_settings', {
      templateUrl: 'views/profile_settings.html',
      controller: 'ProfileSettingsController',
      controllerAs: 'profile_settings',
      resolve: {
        authenticate: Authenticator
      }
    })
    .when('/find', {
      templateUrl: 'views/find.html',
      controller: 'FindController',
      controllerAs: 'find',
      resolve: {
        authenticate: Authenticator
      }
    })
    .when('/chat', {
      templateUrl: 'views/chat.html',
      controller: 'ChatController',
      controllerAs: 'chat',
      resolve: {
        authenticate: Authenticator,
      }
    })
    .when('/chat/:chatid', {
      templateUrl: 'views/chat.html',
      controller: 'ChatController',
      controllerAs: 'chat',
      resolve: {
        authenticate: Authenticator,
        setupRoom: RoomSetup
      }
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginController'
    })
    .when('/home', {
      templateUrl: 'views/main.html',
      controller: 'MainController',
      controllerAs: 'main',
      resolve: {
        authenticate: Authenticator
      }
    })
    .otherwise({
      redirectTo: '/login'
    });
}).run(function($rootScope, $q, $window, $location, AuthService, $timeout) {
  $rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
    console.log(event, current, previous, rejection);
    if (rejection == "login_failed") {
      console.log("login failed");
      $location.path("/login");
    }
  });

  $rootScope.isLogin = function () {
    return $location.path() === "/login";
  };

  _dataTipPopoverTarget = $("#voice-toggle");
  _dataTipPopoverTarget.popover({
      title: "",
      placement: 'left',
      container: 'body',
      trigger: 'focus',
      html : true,
      content: "<div id='voice-popover' style='display: inline-block; padding-right: 10px'>Try the voice control feature!</div><a ng-click='hidePopover()' class='glyphicon glyphicon-remove-circle' aria-hidden='true'></a><div>Say <span class='alert-danger' style='font-weight: bold; font-size: 18px'> Orange</span> to start!</div>"
  });

  _dataTipPopoverTarget.popover('show');

  $rootScope.hidePopover = function() {
    _dataTipPopoverTarget.popover('hide');
  }



  // create a user variable which is accessable from root scope
  $rootScope.user = {};

  FB.init({
    appId: '1559290244313333',
    cookie: true,  // enable cookies to allow the server to access
    xfbml: true,  // parse social plugins on this page
    version: 'v2.1' // use version 2.1
  });

  // initialize the parse
  Parse.initialize("OBaEpcoBmjrtCpLUDLF8DxjsLaqd581mWrUMvhe2", "GNyr0W0eom463gV2vkjr2NhH10Zu7iR1grK55b3d");
});