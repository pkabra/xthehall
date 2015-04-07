angular.module('XtheHall')
    .controller('MainController', function($scope, $location, $http, HistoryService, MatchService, ProfileService, VoiceService, AuthService) {
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
                    ProfileService.getUsersWithIds(r.attributes.users).then(function(friends) {
                        var nicknames = _.map(friends, function(f) { return f.attributes.nickname; }).join(", ");
                        var image = friends[0].attributes.image ? friends[0].attributes.image._url : "../images/SmallLogo1.png";
                        var timestamp = r.createdAt.toLocaleDateString() + " " + r.createdAt.toLocaleTimeString();
                        var messagePreview = "";
                        if (!_.isEmpty(m)) {
                            timestamp = m[0].time.toLocaleDateString() + " " + m[0].time.toLocaleTimeString();
                            messagePreview = m[0].message;
                        }

                        $scope.conversationPreviews.push({
                            id: r.id,
                            timestamp: timestamp,
                            messagePreview: messagePreview,
                            picUrl: image,
                            friends: nicknames,
                        });
                    });
                });
            });
        });

        $scope.trendingTopics = [];
        $.get("/trends", function (response) {
            $scope.trendingTopics = response['1'].slice(0, 6);
            $scope.$apply();
        });

        VoiceService.setCommands({
            create: function (commands) {
                $location.path("/find");
                $scope.$apply();
            },

            chat: function (commands) {
                if (_.contains(commands, "create")) {
                    $location.path("/find");
                    $scope.$apply();
                    return;
                }

                _.each(commands, function (command) {
                    if (!_.isNaN(parseInt(command))) {
                        var chatid = parseInt(command) - 1;
                        if (chatid < $scope.conversationPreviews.length)
                            $location.path("/chat/" + $scope.conversationPreviews[chatid].id);
                    }
                });
                $scope.$apply();
            }
        });

        if (ProfileService.getVoice_control()) {
            VoiceService.start();
        }
});
