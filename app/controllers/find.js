angular.module('XtheHall')
.controller('FindController', function($scope, $location, MatchService, ProfileService, HistoryService) {

    $('body').popover({ selector: '[data-popover]', trigger: 'click hover', placement: 'auto', delay: {show: 50, hide: 50}});

    $scope.testBool = true;
    $scope.tags = [];

    $scope.queryString = "";
    $scope.hospitalButtonText = "Show Only Patients from Same Hospital";
    $scope.sameHospitalProfiles = [];

    var selectUsersObject = $('#chatUsers');

    MatchService.findUsersRandom(10).then(function(profiles) {

        $scope.user_hospital = ProfileService.getHospital_info();
        $scope.user_interests = ProfileService.getInterest();
        $scope.user_fbid = ProfileService.getId();

        for (i = 0; i < profiles.length; ++i) {
            var temp_array = [];

            temp_array = profiles[i].attributes.interest;
            if(typeof temp_array === 'undefined') {
                temp_array = [];
            };

            temp_array = temp_array.filter(function(n) {
                if ($scope.user_interests)
                    return $scope.user_interests.indexOf(n) != -1
                return false;
            });

            profiles[i].attributes['simscore'] = temp_array.length;
            profiles[i].attributes['hover_text'] = "<b> Hospital </b>  <br>"

            if (typeof profiles[i].attributes['hospital_info'] === "undefined")
                profiles[i].attributes['hover_text'] = profiles[i].attributes['hover_text'].concat("N/A");
            else
                profiles[i].attributes['hover_text'] = profiles[i].attributes['hover_text'].concat(profiles[i].attributes['hospital_info']);

            profiles[i].attributes['hover_text'] = profiles[i].attributes['hover_text'].concat("<br> <br> <b> Interests </b> <br>");

            if (typeof profiles[i].attributes['interest'] === "undefined")
                profiles[i].attributes['hover_text'] = profiles[i].attributes['hover_text'].concat("N/A<br>");
            else {
                for (j = 0; j < profiles[i].attributes['interest'].length; ++j)
                {
                    profiles[i].attributes['hover_text'] = profiles[i].attributes['hover_text'].concat(profiles[i].attributes['interest'][j]);
                    profiles[i].attributes['hover_text'] = profiles[i].attributes['hover_text'].concat("<br>");
                }
            }
        }

        $scope.profiles = profiles;
        $scope.visibleProfiles = $scope.profiles;
        selectUsersObject.select2();
    });

    $scope.hospitalToggle = function() {
        if ($scope.hospitalButtonText == "Show Only Patients from Same Hospital") {
            $scope.hospitalButtonText = "Show All Patients"

            if ($scope.sameHospitalProfiles.length == 0) {
                for (i = 0; i < $scope.profiles.length; i++) {
                    if ($scope.profiles[i].attributes.hospital_info == $scope.user_hospital) {
                        $scope.sameHospitalProfiles.push($scope.profiles[i]);
                    }
                }
            }

            $scope.visibleProfiles = $scope.sameHospitalProfiles;
        }
        else {
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
    };

    $scope.btnClick = function() {
        $('#infoDialog').modal('show');
    };

    $scope.addToChatList = function(name, fbid) {
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
    };

    $scope.isSimilarInterests = function(simscore) {
        if ($scope.user_interests)
            return ((simscore / $scope.user_interests.length) > 0.5);
        return false;
    };

    $scope.applyProfileClasses = function(profile) {
        return {
            interestMatch: $scope.isSimilarInterests(profile.attributes.simscore),
            notInterestMatch: !$scope.isSimilarInterests(profile.attributes.simscore),
            hospitalMatch: $scope.isSameHospital(profile.attributes.hospital_info)
        };
    };

    $scope.createNewChatRoom = function () {
        var success = function (room) {
            $location.path("/chat/" + room.id);
        };

        var users = selectUsersObject.val();
        users.push($scope.user.id);
        console.log(users);
        HistoryService.create_room(users, success);
    };
});
