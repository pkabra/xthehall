angular.module('XtheHall', [
  'ngRoute'
]).config(function ( $routeProvider ) {
  
  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'Home',
      controllerAs: 'home'
    })
    .otherwise({
      redirectTo: '/home'
    });
}).run(function($rootScope){
  $rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
    console.log(event, current, previous, rejection)
  })
});