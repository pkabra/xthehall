angular.module('XtheHall')
.controller('LoginController', function($q, $scope, AuthService) {

  $scope.showError = false;
  $scope.showSuccess = false;

  $scope.loginfb = function () {
    FB.login(function (response) {
      if (response.status == 'connected') {
        window.location.href="#/main";
      }
    });
  }

  $scope.login = function(user) {
  	AuthService.login(user.account, user.password).then(function() {
  		window.location.href="#/main";
  	}, function() {
  		$scope.error = 'Error: wrong password or username';
  		$scope.showError = true;
  		$scope.showSuccess = false;
  	});
  	$scope.user.account = '';
  	$scope.user.password = '';
  }

  $scope.signup = function(user) {
  	AuthService.signUp(user.account, user.password).then(function() {
  		$scope.success = 'Success: please log in';
		$scope.showError = false;
		$scope.showSuccess = true;
  	}, function() {
  		$scope.error = 'Error: please try another username';
  		$scope.showError = true;
  		$scope.showSuccess = false;
  	});
  	$scope.user.account = '';
  	$scope.user.password = '';
  }
});