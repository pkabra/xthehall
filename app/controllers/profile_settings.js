
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
.controller('ProfileSettingsController', function($scope, ProfileService) {

  var fileInput = document.getElementById('image-input');
  var image = document.getElementById('image-container');


  $scope.click_nickname = function(){

    console.log("CLICK!");

    final_transcript = '';
    recognition.start();


  }

  $scope.image_upload = function(){

    var fileUrl = window.URL.createObjectURL(fileInput.files[0]);
    image.src = fileUrl;
    console.log(JSON.stringify(typeof(fileInput)));
    console.log(fileUrl);
    console.log(JSON.stringify(fileInput.files[0]));


    fullPath = document.getElementById('image-input').value;

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


//Change input width to match width of characters.
$scope.onWrite = function (text)
{
  width = "width: " + (text.length * 22 + 50).toString() + "px;";
  return width;
};

$scope.add_interest = function(item, interest_list)
{
  $scope.interest_list.push(item);
  $scope.new_interest = "";
};

$scope.click = function(index)
{
  $scope.interest_list.splice(index,1);
  console.log(index);
};



if (!('webkitSpeechRecognition' in window)) {
  console.log("DAMN");
} else {
  console.log("COOL");

  var recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = function() {  };
  recognition.onresult = function(event) { $scope.nickname = event.results[event.results.length-1][0].transcript; $scope.nickname_width = $scope.onWrite($scope.nickname); console.log($scope.nickname); $scope.$apply();};
  recognition.onerror = function(event) {  };
  recognition.onend = function() {  };

}


function init() {

  console.log(ProfileService);

  $scope.hospital_list = JSON.parse('["Sinai-Grace Hospital", "Henry Ford Hospital", "Beaumont Hospital", "Oakwood Heritage Hospital"]');
  $scope.save_click = false;

  
  console.log("0");

  try {
    $scope.nickname = ProfileService.getNickname();
    console.log("1");
    $scope.nickname_width = $scope.onWrite($scope.nickname);
    console.log("2");



    $scope.interest_list = ProfileService.getInterest();
    console.log("3");
    
    
    $scope.hospital_select = ProfileService.getHospital_info();
    console.log("4");
    image.src = ProfileService.getImage();
    console.log("Successfully pulled values.");

  }
  catch(err) {

    $scope.nickname = "";
    $scope.nickname_width = "width: 50px;";
    $scope.interest_list = [];

    console.log("Couldn't pull values, populating with default.");
  }

  console.log("Done");
}

init();

$scope.save = function() {

  console.log("Save");
  console.log($scope.nickname);
  console.log(JSON.stringify($scope.interest_list));
  console.log(JSON.stringify($scope.hospital_select));

  ProfileService.setNickname($scope.nickname);
  ProfileService.setInterest($scope.interest_list);
  ProfileService.setHospital_info($scope.hospital_select);
  ProfileService.setImage(fileInput.files);
};

document.getElementById('hospital_select').value = "Beaumont Hospital";

});