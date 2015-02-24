angular.module('XtheHall')
.controller('LoginController', function($q, $scope, AuthService) {
  $scope.loginfb = function () {
    FB.login(function (response) {
      if (response.status == 'connected') {
        window.location.href="#/main";
      }
    });
  }  
});