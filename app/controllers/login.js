angular.module('XtheHall')
.controller('LoginController', function($q, $scope, AuthService) {
  console.log("hello");
  $scope.loginfb = function () {
    FB.login(function (response) {
      if (response.status == 'connected') {
        window.location.href="#/main";
      }
    });
  }  
});