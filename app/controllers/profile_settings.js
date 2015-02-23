
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
.controller('ProfileSettingsController', function($scope) {

      var fileInput = document.getElementById('image-input');
      var image = document.getElementById('image-container');

      $scope.image_upload = function(){

          var fileUrl = window.URL.createObjectURL(fileInput.files[0]);
          image.src = fileUrl;


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



  $scope.hospital_list = ["Mott Children's Hospital", "Univ. of Michigan Hospital", "Ohio State Hospital"];

  $scope.interest_list = ["Soccer", "Football", "Basketball"];


  $scope.nickname_width = "width: 50px;";


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

});