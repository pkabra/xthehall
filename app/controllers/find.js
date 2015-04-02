angular.module('XtheHall')
.controller('FindController', function($scope, MatchService) {

    // console.log(MatchService);

      var recognition = new webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = function() {  };
      recognition.onresult = function(event) { $scope.queryString = event.results[event.results.length-1][0].transcript;  $scope.onType(); $scope.$apply();};
      recognition.onerror = function(event) {  };
      recognition.onend = function() {  };
      recognition.start();



    $scope.queryString = "";

    MatchService.findUsersRandom(10).then(function(profiles)
        {

            console.log(profiles[0]);
            console.log("HAHA!");
            console.log(profiles[0].attributes.image);
            console.log(profiles[0].attributes.image._url);
            console.log(typeof(profiles[0].attributes.image));
            console.log(profiles[0].attributes.nickname);

            $scope.profiles = profiles;
            $scope.visibleProfiles = $scope.profiles;

        });

      $scope.clickQuery = function(){

        console.log("CLICK!");

        final_transcript = '';
        recognition.start();


      }


    $scope.onType = function() {

        $scope.visibleProfiles = [];

        for (i = 0; i < $scope.profiles.length; i++) { 
            if ($scope.profiles[i].attributes.nickname.indexOf($scope.queryString) > -1)
            {
                $scope.visibleProfiles.push($scope.profiles[i]);
            }
        }

        console.log("Type");
        console.log($scope.visibleProfiles);

    };

    $scope.btnClick = function() {
        console.log("BLAH");
        $('#infoDialog').modal('show');
    };

    // console.log();

 
});
