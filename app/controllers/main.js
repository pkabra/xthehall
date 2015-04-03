/**
 * Created by Adam on 2/19/15.
 */
angular.module('XtheHall')
    .controller('MainController', function($scope, $location, $http, HistoryService, MatchService, ProfileService, VoiceService) {
        $scope.conversationPreviews = [];
        $scope.accessibility = false;

        $('#accessibility-toggle').on('click', function() {
            $scope.accessibility = !$scope.accessibility;
            if($scope.accessibility) {
                $('body').addClass('accessibility');
                $('h4').addClass('accessibility');
            } else {
                $('body').removeClass('accessibility');
            }
            $scope.$apply();
        });

        HistoryService.getActiveChats($scope.user.id).then(function (rooms) {
            _.each(rooms, function (r) {
                HistoryService.retrieveHistory(r.id, 1).then(function (m) {
                    if (_.isEmpty(m)) return;
                    $scope.conversationPreviews.push({
                        id: r.id,
                        timestamp: m[0].time.toLocaleDateString() + " " + m[0].time.toLocaleTimeString(),
                        messagePreview: m[0].message,
                        picUrl: "../images/SmallLogo1.png",
                        friends: ['Emily', 'Hannah', 'Bradley', 'Stacey'],
                        friendString: ''
                    });
                    $scope.conversationPreviews.forEach(function (conversation, conversationIndex, conversationArray) {
                        var friendString = "";
                        conversation.friends.forEach(function (friend, friendIndex, friendArray) {
                            friendString += friend;
                            if (friendIndex < friendArray.length - 1)
                                friendString += ', ';
                        });
                        conversation.friendString = friendString;
                    });
                });
            });
        });
        $scope.trendingTopics = ["Adam", "Coolest Coder Evvva", "What Person Is Fantastic?  Adam!", "Bird Planes?!?"];

        MatchService.findUsersByLocation(10).then(function (users) {
            var selectUser = $('#chatUserSelect');
            _.each(users, function (u) {
                if ($scope.user.id == u.attributes.fbid) return; // Skip yourself

                // Add user to list of choosable chat partners
                var name = _.isEmpty(u.attributes.nickname) ? u.attributes.fbid : u.attributes.nickname;
                selectUser.append("<option value='" + u.attributes.fbid + "'>" + name + "</option>");
            });
            $('#chatUserSelect').select2();
        });

        $scope.showMakeChatRoom = function () {
            $('#createChatRoomModal').modal('show');
        };
        $scope.createNewChatRoom = function () {
            var users = $('#chatUserSelect').val();
            users.push($scope.user.id);
            var success = function (room) {
                $location.path("/chat/" + room.id);
            };
            HistoryService.create_room(users, success);
        };

        VoiceService.setCommands({
            open: function (commands) {
                if (_.contains(commands, "pod") &&
                    _.contains(commands, "bay") &&
                    _.contains(commands, "doors")) {
                    alert("I'm sorry " + $scope.user.first_name + ", I'm afraid I can't do that");
                };
            },

            chat: function (commands) {
                _.each(commands, function (command) {
                    if (!_.isNaN(parseInt(command))) {
                        var chatid = parseInt(command) - 1;
                        $location.path($($('.chats')[parseInt(command)]).find('a').attr('href').substr(1));
                    }
                });
            }
        });

        VoiceService.start();

        // var req = {
        //     headers: {
        //         Authorization: 'OAuth oauth_consumer_key="DC0sePOBbQ8bYdC8r4Smg",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1424744457",oauth_nonce="761193913",oauth_version="1.0",oauth_token="3057842603-X3h15gWyUzrgBAPWKjRLd5HGSSLewwmj9GHXQex",oauth_signature="Q7Wx%2F6vgYf0x4k2z4AlpbhkA6Jw%3D"',
        //         Host: 'api.twitter.com'
        //     },
        //     url: 'https://api.twitter.com/1.1/trends/place.json?id=1',
        //     method: 'GET'
        // };

        // $http(req).
        //     success(function(data, status, headers, config) {
        //         debugger;
        //         // this callback will be called asynchronously
        //         // when the response is available
        //     }).
        //     error(function(data, status, headers, config) {
        //         debugger;
        //         // called asynchronously if an error occurs
        //         // or server returns response with an error status.
        //     });
});
