
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
      $scope.hospital_list = ["Mott Children's Hospital", "Univ. of Michigan Hospital", "Ohio State Hospital"];
      $scope.interest_list = ["Soccer", "Football", "Basketball"];
      $scope.nickname_width = "width: 50px;";


    $scope.image_upload = function(){

          var fileUrl = window.URL.createObjectURL(fileInput.files[0]);
          image.src = fileUrl;
          console.log(fileUrl);


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


      function init() {

        // ProfileService.getNickname();


        $scope.nickname = ProfileService.getNickname();
        $scope.nickname_width = $scope.onWrite($scope.nickname);
        $scope.hospital_list = JSON.parse('["Mott Children\'s Hospital", "Univ. of Michigan Hospital", "Ohio State Hospital"]');
        $scope.interest_list = JSON.parse('["Soccer", "Football", "Basketball"]');
      
      }

      init();

      

      $scope.save = function() {

        console.log("Save");
        console.log($scope.nickname);
        console.log(JSON.stringify($scope.interest_list));
        console.log(document.getElementById('hospital_select').value);
      };



});