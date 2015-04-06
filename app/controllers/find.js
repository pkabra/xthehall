angular.module('XtheHall')
.controller('FindController', function($scope, $location, MatchService, ProfileService, HistoryService) {

    $('body').popover({ selector: '[data-popover]', trigger: 'click hover', placement: 'auto', delay: {show: 50, hide: 50}});



  $scope.testBool = true;
  $scope.tags = [];
  $scope.name_to_fbid = {};

    $scope.queryString = "";
    $scope.hospitalButtonText = "Show Only Patients from Same Hospital";
    $scope.sameHospitalProfiles = [];

    var selectUsersObject = $('#chatUsers');

    MatchService.findUsersRandom(10).then(function(profiles)
        {

            $scope.user_hospital = ProfileService.getHospital_info();
            $scope.user_interests = ProfileService.getInterest();
            $scope.user_fbid = ProfileService.getId();

            console.log("User interests");
            console.log($scope.user_interests);




            for (i = 0; i < profiles.length; ++i)
            {
                var temp_array = [];

                temp_array = profiles[i].attributes.interest;
                if(typeof temp_array === 'undefined'){
                    temp_array = [];
                };

                temp_array = temp_array.filter(function(n) {
                    return $scope.user_interests.indexOf(n) != -1
                });

                profiles[i].attributes['simscore'] = temp_array.length;



                profiles[i].attributes['hover_text'] = "<b> Hospital </b>  <br>" 

                if (typeof profiles[i].attributes['hospital_info'] === "undefined")
                    profiles[i].attributes['hover_text'] = profiles[i].attributes['hover_text'].concat("N/A");
                else 
                    profiles[i].attributes['hover_text'] = profiles[i].attributes['hover_text'].concat(profiles[i].attributes['hospital_info']);

                profiles[i].attributes['hover_text'] = profiles[i].attributes['hover_text'].concat("<br> <b> Interests </b> <br>");

                if (typeof profiles[i].attributes['interest'] === "undefined")
                    profiles[i].attributes['hover_text'] = profiles[i].attributes['hover_text'].concat("N/A<br>");
                else
                {
                    for (j = 0; j < profiles[i].attributes['interest'].length; ++j)
                    {
                        profiles[i].attributes['hover_text'] = profiles[i].attributes['hover_text'].concat(profiles[i].attributes['interest'][j]);
                        profiles[i].attributes['hover_text'] = profiles[i].attributes['hover_text'].concat("<br>");
                    }
                }

                
            }

            console.log("Wait.");
            console.log(profiles[1]);
            console.log("HAHA!");
            console.log(profiles[1].attributes.image);
            console.log(profiles[1].createdAt);
            console.log(profiles[1].createdAt - profiles[0].createdAt);
            console.log(typeof(profiles[1].createdAt));
            console.log(profiles[1].attributes.nickname);

            var date = new Date();
            console.log("Huh?");
            console.log(date);
            console.log(typeof(date));


            $scope.profiles = profiles;
            $scope.visibleProfiles = $scope.profiles;
            $scope.$apply();
            selectUsersObject.select2();
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

    $scope.blah = function(name, fbid) {
        var data = selectUsersObject.val();
        if (data) {
            data.push(fbid);
            selectUsersObject.select2("val", data);
        } else {
            selectUsersObject.select2("val", [fbid]);
        }
    };

    $scope.isSameHospital = function(hospital) {
        return (hospital == $scope.user_hospital);
    }

    $scope.isSimilarInterests = function(simscore) {
        return ((simscore / $scope.user_interests.length) > 0.5);
    }

    $scope.createNewChatRoom = function () {

        var success = function (room) {
            $location.path("/chat/" + room.id);
        };

        var user_fbids = [];

        for (i = 0; i < $scope.tags.length; i++)
        {
            user_fbids.push($scope.name_to_fbid[$scope.tags[i]["text"]]);
        }

        HistoryService.create_room($scope.user_fbids, success);
    };
 
});
