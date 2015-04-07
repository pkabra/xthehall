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
                        var timestamp = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
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
        $scope.trendingTopics = ["Adam", "Coolest Coder Evvva", "What Person Is Fantastic?  Adam!", "Bird Planes?!?"];



        $scope.logout = function() {
            AuthService.logout();
        }

        VoiceService.setCommands({
            chat: function (commands) {
                _.each(commands, function (command) {
                    if (!_.isNaN(parseInt(command))) {
                        var chatid = parseInt(command) - 1;
                        if (chatid < conversationPreviews.length)
                            $location.path("/chat/" + conversationPreviews[chatid].id);
                    }
                });
                $scope.$apply();
            }
        });

        if (ProfileService.getVoice_control()) {
            VoiceService.start();
        }
});
