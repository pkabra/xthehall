angular.module('XtheHall')
.controller('ChatController', function($scope, $location, AuthService, InstantMessageService, ProfileService, HistoryService, AuthService, VoiceService) {
  var recipients = _.keys($scope.room.users);

  $scope.messages = [];

  HistoryService.retrieveHistory($scope.room.id, 10)
  .then(function(history) {
    _.each(history, function(h) {
      var u = $scope.room.users[h.sender];
      var m = {
        incoming: h.sender != $scope.user.id,
        user: u.attributes.nickname || u.attributes.fbid,
        time: h.time.toLocaleDateString() + " " + h.time.toLocaleTimeString(),
        text: h.message
      };
      $scope.messages.push(m);
    });
  });

  var incomingmessageListener = function(message) {
    if (message.textBody.room != $scope.room.id) return;
    var t = new Date();
    var m = {
      incoming: $scope.user.id != message.senderId,
      user: $scope.room.users[message.senderId].attributes.nickname || message.senderId,
      time: t.toLocaleDateString() + " " + t.toLocaleTimeString(),
      text: message.textBody.text
    };
    $scope.messages.push(m);
    $scope.$apply();
  };

  var deliveredMessageListener = function() {
    console.log('message sent');
  };

  InstantMessageService.addIncomingMessageListener(incomingmessageListener);

  InstantMessageService.addDeliveredMessageListener(deliveredMessageListener);

  $scope.sendMessage = function() {
    event.preventDefault();
    var text = $('input#message').val();
    $('input#message').val("");
    if (_.isEmpty(text)) return;

    InstantMessageService.sendMessage(recipients, {room: $scope.room.id, text: text});
    HistoryService.save($scope.room.id, $scope.user.id, text);
  };

  $scope.logout = function() {
      AuthService.logout();
  }

  VoiceService.setCommands({
    write: function (commands) {
      console.log(_.rest(commands).join(" "));
      $('input#message').val($('input#message').val() + _.rest(commands).join(" "));
      $scope.$apply();
    },
    send: function (commands) {
      $scope.sendMessage();
    }
  });

  if (ProfileService.getVoice_control()) {
      VoiceService.start();
  }
});