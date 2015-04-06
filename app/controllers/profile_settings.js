
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
.controller('ProfileSettingsController', function($scope, ProfileService, AuthService) {
  var fileInput = document.getElementById('image-input');
  var image = document.getElementById('image-container');

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
  $('#voice-control-toggle').bootstrapSwitch('state', true && ProfileService.getVoice_control()); //TODO LINK WITH PARSE HERE

$scope.formSubmit = function() {
    $("html, body").animate({ scrollTop: $(document).height() }, "slow");
    $scope.formError = false;
    $scope.formSave = false;

    var voiceControl = $('#voice-control-toggle').bootstrapSwitch("state");
    var interests = $('#interestSelect').val();

    if($scope.newPassword !== $scope.newPasswordConfirmation) {
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
    
    var promise = ProfileService.saveProfile();
    promise.then(function() {
        $scope.formSave = true;
    }, function() {
        $scope.formError = true;
        $scope.formErrorMessage = "Unsuccessful save. Please try again.";
    });

};

$scope.logout = function() {
    AuthService.logout();
};

$('#hospital_select').val("Beaumont Hospital");
$('#interestSelect').select2();
$('#voice-control-toggle').bootstrapSwitch();
});
