angular.module('XtheHall')
.controller('FindController', function($scope, MatchService, ProfileService) {

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
    $scope.hospitalButtonText = "Show Only Patients from Same Hospital";
    $scope.sameHospitalProfiles = [];

    MatchService.findUsersRandom(10).then(function(profiles)
        {

            $scope.user_hospital = ProfileService.getHospital_info();


            console.log("Wait.");
            console.log(profiles[0]);
            console.log("HAHA!");
            console.log(profiles[0].attributes.image);
            console.log(profiles[0].createdAt);
            console.log(profiles[1].createdAt - profiles[0].createdAt);
            console.log(typeof(profiles[0].createdAt));
            console.log(profiles[0].attributes.nickname);

            var date = new Date();
            console.log("Huh?");
            console.log(date);
            console.log(typeof(date));


            $scope.profiles = profiles;
            $scope.visibleProfiles = $scope.profiles;

        });

      $scope.clickQuery = function(){

        console.log("CLICK!");

        final_transcript = '';
        recognition.start();


      }


    $scope.hospitalToggle = function() {
        if ($scope.hospitalButtonText == "Show Only Patients from Same Hospital")
        {
            $scope.hospitalButtonText = "Show All Patients"

            if ($scope.sameHospitalProfiles.length == 0)
            {
                for (i = 0; i < $scope.profiles.length; i++)
                {
                    if ($scope.profiles[i].attributes.hospital_info == $scope.user_hospital)
                    {
                        $scope.sameHospitalProfiles.push($scope.profiles[i]);
                    }
                }
            }

            $scope.visibleProfiles = $scope.sameHospitalProfiles;
        }
        else
        {
            $scope.hospitalButtonText = "Show Only Patients from Same Hospital"

            $scope.visibleProfiles = $scope.profiles;
        }
    };

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
