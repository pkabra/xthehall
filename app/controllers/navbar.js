/**
 * Created by Adam on 4/16/15.
 */

angular.module('XtheHall')
    .controller('NavbarController', function($scope) {
        $scope.accessibility = false;

        $('#accessibility-toggle').on('click', function() {
            $scope.accessibility = !$scope.accessibility;
            if($scope.accessibility) {
                $('body').addClass('accessibility');
                $('h4').addClass('accessibility');
                $('p').addClass('accessibility');
            } else {
                $('body').removeClass('accessibility');
                $('h4').removeClass('accessibility');
                $('p').removeClass('accessibility');
            }
            $scope.$apply();
        });
    });