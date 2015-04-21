
angular.module('XtheHall')
.directive('ngEnter', function() {
  return function(scope, element, attrs) {
    element.bind("keydown keypress", function(event) {
      if(event.which === 13) {
        scope.$apply(function(){
          scope.$eval(attrs.ngEnter);
        });

        event.preventDefault();
      }
    });
  };
})
.controller('ProfileSettingsController', function($scope, ProfileService, AuthService, VoiceService) {
  var fileInput = document.getElementById('image-input');
  var image = document.getElementById('image-container');

  $scope.showDeleteUser = function() {
      $('#deleteUserModal').modal('show');
  };

  $scope.deleteUser = function() {
      console.log('in delete user function...');
      var promise = ProfileService.deleteProfile();
      promise.then(function() {
          AuthService.logout();
          window.location.href="#/login?del";
      }, function() {
          $('#deleteUserModal').modal('hide');
          $("html, body").animate({ scrollTop: $(document).height() }, "slow");
          $scope.formSave = false;
          $scope.formError = true;
          $scope.formErrorMessage = "Unsuccessful deletion of account. Please try again later.";
      });
  };

  $scope.image_upload = function(){

    var fileUrl = window.URL.createObjectURL(fileInput.files[0]);
    image.src = fileUrl;

    var fullPath = document.getElementById('image-input').value;

    if (fullPath) {
      var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
      var filename = fullPath.substring(startIndex);
      if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
        filename = filename.substring(1);
      }
    }

    $scope.avatar_img_name = filename;
    $scope.$apply();
  };

  $scope.hospital_list = ["Sinai-Grace Hospital", "Henry Ford Hospital", "Beaumont Hospital", "Oakwood Heritage Hospital"];
  $scope.newPassword = $scope.newPasswordConfirmation = String();
  $scope.formError = false;
  $scope.formErrorMessage = String();
  $scope.formSave = false;
  $scope.nickname = ProfileService.getNickname();
  $('#interestSelect').val(ProfileService.getInterest());
  $scope.hospital_select = ProfileService.getHospital_info();
  image.src = ProfileService.getImage();
  $('#voice-control-toggle').bootstrapSwitch('state', ProfileService.getVoice_control()); //TODO LINK WITH PARSE HERE

$scope.formSubmit = function() {
    $("html, body").animate({ scrollTop: $(document).height() }, "slow");
    $scope.formError = false;
    $scope.formSave = false;

    if ($scope.nickname === "XtheHallUser") {
      $scope.formSave = false;
      $scope.formError = true;
      $scope.formErrorMessage = "Please update the nickname";
      return;
    }

    var voiceControl = $('#voice-control-toggle').bootstrapSwitch("state");
    var interests = $('#interestSelect').val();

    if($scope.newPassword !== $scope.newPasswordConfirmation) {
        $scope.formSave = false;
        $scope.formError = true;
        $scope.formErrorMessage = "New password does not match its confirmation.";
        return;
    }

    ProfileService.setNickname($scope.nickname);
    ProfileService.setInterest(interests);
    ProfileService.setHospital_info($scope.hospital_select);
    ProfileService.setImage(fileInput.files);

    if (!_.isEmpty($scope.newPassword))
      ProfileService.setPassword($scope.newPassword);

    ProfileService.setVoiceControl(voiceControl);
    if (!voiceControl) {
      VoiceService.stop();
    }
    
    var promise = ProfileService.saveProfile();
    promise.then(function() {
        $scope.formSave = true;
        $scope.formError = false;
    }, function() {
        $scope.formSave = false;
        $scope.formError = true;
        $scope.formErrorMessage = "Unsuccessful save. Please try again.";
    });

};

  $('#interestSelect').select2();
  $('#voice-control-toggle').bootstrapSwitch();

  VoiceService.setCommands({
    nickname: function (commands) {
      var temp = _.rest(commands, _.indexOf(commands, "nickname"));
      if (_.contains(temp, "to")) {
        temp = _.rest(temp, _.indexOf(temp, "to"))
      }
      $scope.nickname = temp.join(" ");
    },

    save: function (commands) {
      $scope.formSubmit();
    },

    interests: function(commands) {
      var interests = ["celebrities", "cooking", "fashion", "movies", "politics", "sports", "technology"];
      var listed = [];
      _.each(commands, function (c) {
        if (_.contains(interests, c)) {
          c[0].toUpperCase();
          listed.push(c);
        }
      });
      $('#interestSelect').select2("val", listed);
    }
  });

  if (ProfileService.getVoice_control()) {
    VoiceService.start();
  }
});
