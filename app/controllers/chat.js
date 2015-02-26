angular.module('XtheHall')
.controller('ChatController', function($scope, $location, AuthService, InstantMessageService, ProfileService, HistoryService) {
    var recipients = [];

    $scope.room.users.forEach(function (u) {
      if (u.attributes.fbid == $scope.user.id) return;
      recipients.push(u.attributes.fbid);
    });

    $scope.messages = [];

    HistoryService.retrieveHistory($scope.room.id, 10)
    .then(function(history) {
      for (var i = 0; i < history.length; i++) {
        var user;
        $scope.room.users.forEach(function (u) {
          if (u.attributes.fbid == history.sender) {
            user = u;
          }
        });
        var m = {
          incoming: true,
          user: user.attributes.nickname || user.attributes.fbid,
          text: history.message
        };
        if (history.sender == $scope.user.id) m.incoming = false;
        $scope.messages.push();
      }
    });

    var incomingmessageListener = function(message) {
        if ($scope.user.id != message.senderId) {
            HistoryService.save($scope.user.id, message.senderId, message.textBody);
            var incoming = '<div class="row" id=' + message.messageId + '><div class="col-xs-8 col-md-6"><div class="message incoming"><p class="user">' + message.senderId + '</p><p class="text">' + message.textBody + '</p></div></div></div>';
            $('div#chatArea').append($(incoming));
        }
    };

    var deliveredMessageListener = function() {
      console.log('message sent');
  };

  InstantMessageService.addIncomingMessageListener(incomingmessageListener);

  InstantMessageService.addDeliveredMessageListener(deliveredMessageListener);

  $scope.sendMessage = function() {
      event.preventDefault();
      var text = $('input#message').val();

      var outgoing = '<div class="row"><div class="col-xs-8 col-xs-offset-4 col-md-6 col-md-offset-6" ng-if="!message.incoming"><div class="message outgoing"><p>' + text + '</p></div></div></div>';
      $('div#chatArea').append($(outgoing));
      
      InstantMessageService.sendMessage(recipients, text);

      console.log(recipients);

      HistoryService.save($scope.room.id, $scope.user.id, text);
  };
});