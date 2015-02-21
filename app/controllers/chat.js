angular.module('XtheHall')
.controller('ChatController', function($scope, AuthService, InstantMessageService, ProfileService, HistoryService) {
    $scope.title = $scope.user.id;

    var recipient = "12345";
    $scope.messages = [];

    HistoryService.retrieve($scope.user.id, recipient, 5).then(
        function(inhistory) {
            for (var i = 0; i < inhistory.length; i++) {
            $scope.messages.push({ incoming: true, user: "dilu", text: inhistory.message});
        }
        });

    // Please DO NOT delete. This section contains example how to use 
    // InstantMessageService, ProfileService, HistoryService

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
      var recipients = [recipient];
      var text = $('input#message').val();

      var outgoing = '<div class="row"><div class="col-xs-8 col-xs-offset-4 col-md-6 col-md-offset-6" ng-if="!message.incoming"><div class="message outgoing"><p>' + text + '</p></div></div></div>';
      $('div#chatArea').append($(outgoing));
      
      InstantMessageService.sendMessage(recipients, text);

      console.log(recipients);

      for (var i = 0; i < recipients.length; i++) {
        HistoryService.save(recipients[i], $scope.user.id, text);
    }
};

$scope.getHistory = function() {
  HistoryService.retrieve('12345', $scope.user.id, 10).then(
    function(history) {
      console.log(history);
  })
}
});