angular.module('XtheHall')
.controller('LoginController', function($q, $scope, $location, AuthService) {

  $scope.showError = false;
  $scope.showSuccess = false;

  if ($location.search().del) {
    $scope.success = "Account Deleted Succesfully";
    $scope.showSuccess = true;
  }

  $scope.loginfb = function () {
    FB.login(function (response) {
      if (response.status == 'connected') {
        if (_.isEmpty($scope.user.attributes.nickname) || $scope.user.attributes.nickname == "XtheHallUser") {
          window.location.href = "#/profile_settings";
        } else {
          window.location.href = "#/home";
        }
      }
    });
  }

  $scope.login = function(user) {
    if (_.isEmpty(user.account) || _.isEmpty(user.password)) return;

  	AuthService.login(user.account, user.password).then(function() {
      var deferred = $q.defer();
      AuthService.watchStatusChange(deferred);
      deferred.promise.then(function () {
        if (_.isEmpty($scope.user.attributes.nickname) || $scope.user.attributes.nickname == "XtheHallUser") {
          window.location.href = "#/profile_settings";
        } else {
          window.location.href = "#/home";
        }
      });
  	}, function() {
  		$scope.error = 'Error: wrong password or username';
  		$scope.showError = true;
  		$scope.showSuccess = false;
      $scope.user.account = '';
      $scope.user.password = '';
  	});
  }

  $scope.signup = function(user) {
    if (_.isEmpty(user.account) || _.isEmpty(user.password)) return;
  
  	AuthService.signUp(user.account, user.password).then(function() {
  		$scope.success = 'Success: please log in';
  		$scope.showError = false;
  		$scope.showSuccess = true;
  	}, function() {
  		$scope.error = 'Error: please try another username';
  		$scope.showError = true;
  		$scope.showSuccess = false;
      $scope.user.account = '';
      $scope.user.password = '';
  	});
  }
});