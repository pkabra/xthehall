angular.module('XtheHall')
.controller('ChatController', function($scope, $location, AuthService, InstantMessageService, ProfileService, HistoryService) {
  var recipients = [];

  _.each($scope.room.users, function (u) {
    if (u.attributes.fbid == $scope.user.id) return;
    recipients.push(u.attributes.fbid);
  });

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
      if ($scope.user.id != message.senderId) {
          HistoryService.save($scope.user.id, message.senderId, message.textBody);
          var t = new Date();
          var m = {
            incoming: true,
            user: message.senderId,
            time: t.toLocaleDateString() + " " + t.toLocaleTimeString(),
            text: message.textBody
          };
          $scope.messages.push(m);
          window.scrollTo(0,document.body.scrollHeight);
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
    $('input#message').val("");
    if (_.isEmpty(text)) return;
    var t = new Date();
    var m = {
      incoming: false,
      user: $scope.user.id,
      time: t.toLocaleDateString() + " " + t.toLocaleTimeString(),
      text: text
    };
    $scope.messages.push(m);

    InstantMessageService.sendMessage(recipients, text);

    console.log(recipients);

    HistoryService.save($scope.room.id, $scope.user.id, text);
    window.scrollTo(0,document.body.scrollHeight);
  };
});