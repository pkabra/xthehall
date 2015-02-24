angular.module('XtheHall')
.controller('LoginController', function($scope, AuthService) {
  $scope.login = function () {
    FB.login();
    AuthService.watchChangeStatus($.Deferred());
  }  
});