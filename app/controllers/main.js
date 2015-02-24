/**
 * Created by Adam on 2/19/15.
 */
angular.module('XtheHall')
    .controller('MainController', function($scope, $http) {
        $scope.conversationPreviews = [
            {
                unreadCount: 2,
                timestamp: "5:30 am",
                messagePreview: "Ya, this is a message.  Wanna fight about it?",
                picUrl: "../images/SmallLogo1.png"
            },
            {
                unreadCount: 0,
                timestamp: "12:30 pm",
                messagePreview: "Yoooooo.  Wazzup, dude?",
                picUrl: "http://fc01.deviantart.net/fs9/i/2006/007/3/4/Bee_by_nicobou.jpg"
            },
            {
                unreadCount: 8,
                timestamp: "12:44 pm",
                messagePreview: "Booooom.  Shakalakalaka.",
                picUrl: "http://th01.deviantart.net/fs9/PRE/i/2006/032/2/b/toucan_by_nicobou.jpg"
            }
        ];
        $scope.trendingTopics = ["Adam", "Coolest Coder Evvva", "What Person Is Fantastic?  Adam!", "Bird Planes?!?"];

        //$http.get('https://api.twitter.com/1.1/trends/place.json?id=1').
        //    success(function(data, status, headers, config) {
        //        // this callback will be called asynchronously
        //        // when the response is available
        //    }).
        //    error(function(data, status, headers, config) {
        //        // called asynchronously if an error occurs
        //        // or server returns response with an error status.
        //    });
    });
